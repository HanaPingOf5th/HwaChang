import { useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { API_PATH} from "../http/api-query";

export function useSocket({id, myKey}:{id: string, myKey:string}) {
  const socket = new SockJS(`${API_PATH}/ws/consulting-room`);
  const roomId= `${id}consulting`;
  console.log("room id: ", roomId);
  
  const [otherKeyList] = useState<string[]>([]);
  const [pcListMap] = useState<Map<string, RTCPeerConnection>>(
    new Map<string, RTCPeerConnection>(),
  );
  const [videoElements] = useState<React.ReactNode[]>([]);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const client = new Client({
    webSocketFactory: () => socket,
    debug: (str: string) => {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,

    onConnect: () => {
      // 서버가 클라이언트에 보내는 응답
      // app/call/key와 매핑됨(startStream을 누를 경우 해당 end point로 응답값이 옴.)
      client.subscribe(`/topic/call/key`, (message) => {
        console.log("서버에서 topic/call/key 응답 값을 받음", message);
        // 해당 응답값을 받을 경우 바디값에 자신의 키(cam key)를 보냄
        client.publish({
          destination: `/app/send/key`,
          body: JSON.stringify(myKey),
        });
      });

      // 서버가 클라이언트에게 보내는 응답값(참여중인 모든 참여자들의 키)
      client.subscribe(`/topic/send/key`, (message) => {
        const key: string = JSON.parse(message.body);
        console.log(key);
        if (myKey !== key && otherKeyList.find((mapKey) => mapKey === myKey) === undefined) {
          otherKeyList.push(key);
        }
      });

      client.subscribe(`/topic/peer/offer/${myKey}/${roomId}`, async (offer) => {
        console.log("offer");
        const key = JSON.parse(offer.body).key;
        const message = JSON.parse(offer.body).body;
        const connection = await createPeerConnection(key);

        pcListMap.set(key, connection);

        await pcListMap
          .get(key)
          .setRemoteDescription(
            new RTCSessionDescription({ type: message.type, sdp: message.sdp }),
          );
        await sendAnswer(pcListMap.get(key), key);
      });

      client.subscribe(`/topic/peer/answer/${myKey}/${roomId}`, async (answer) => {
        console.log("answer");
        const key = JSON.parse(answer.body).key;
        const message = JSON.parse(answer.body).body;
        await pcListMap.get(key).setRemoteDescription(new RTCSessionDescription(message));
      });

      client.subscribe(`/topic/peer/iceCandidate/${myKey}/${roomId}`, async (candidate) => {
        console.log("iceCandidate");
        const key = JSON.parse(candidate.body).key as string;
        const message = JSON.parse(candidate.body).body;
        setTimeout(async () => {
          await pcListMap.get(key).addIceCandidate(
            new RTCIceCandidate({
              candidate: message.candidate,
              sdpMLineIndex: message.sdpMLineIndex,
              sdpMid: message.sdpMid,
            }),
          );
        }, 1000);
      });

      client.subscribe(`/topic/peer/shareScreen/${roomId}`, (message)=>{
        console.log(message);
      })
    },
  });

  const startScreenStream = async () => {
    try {
      console.log("화면 공유 시작");

      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      pcListMap.forEach((pc) => {
        const videoSender = pc.getSenders().find((sender) => sender.track?.kind === "video");
        
        if (videoSender) {
          videoSender.replaceTrack(screenStream.getVideoTracks()[0]);
        } else {
          pc.addTrack(screenStream.getVideoTracks()[0], screenStream);
        }
      });

      const newVideoElement = (
        <video
          className="rounded-xl aspect-[16/9] object-cover"
          key={myKey}
          autoPlay
          playsInline
          ref={(videoElem: HTMLVideoElement | null) => {
            if (videoElem) {
              videoElem.srcObject = screenStream;
            }
          }}
        />
      );

      // setVideoElements((prev) => [...prev, newVideoElement]);
      videoElements.push(newVideoElement)

      screenStream.getVideoTracks()[0].onended = () => {
        console.log("화면 공유가 종료되었습니다.");
        if(screenStream){
          screenStream.getTracks().forEach((track)=>track.stop());
          pcListMap.forEach(async (pc) => {
            const videoSender = pc.getSenders().find((sender)=>sender.track.kind === "video");
            if(videoSender){
              const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
              videoSender.replaceTrack(stream.getVideoTracks()[0]);
            }
          })
        }
      };
    } catch (error) {
      console.error("화면 공유 중 오류 발생:", error);
      alert("화면 공유를 시작하는 데 실패했습니다. 권한을 확인하세요.");
    }
  };

  const startStream = async () => {
    if (client.connected) {
      console.log("start steam ... ");
      setTimeout(()=>{
        if (client.connected) {
          client.publish({ destination: `/app/call/key`, body: "publish: call/key" });
          setTimeout(() => {
            otherKeyList.map(async (key) => {
              if (!pcListMap.has(key)) {
                pcListMap.set(key, await createPeerConnection(key));
                await sendOffer(pcListMap.get(key), key);
              }
            });
          }, 1000);
        }
      },1000)
    }
  };

  const createPeerConnection = async (otherKey: string) => {
    let iceServers= [];
  
    try {
      iceServers = iceServers.concat(
        [
          {
              "url": "turn:global.turn.twilio.com:3478?transport=udp",
              "username": "e33d33278e787f4f166203f19f7d4ea5d56320a0fa2792e5b187fc0e7d4fa006",
              "urls": "turn:global.turn.twilio.com:3478?transport=udp",
              "credential": "R4TKSAdY77ue4mOhspdbXFL7SAMv3bIQIQhU+w40Enk="
          }
      ]
      );
    } catch (error) {
      console.error("Twilio TURN/STUN 서버를 가져오는 중 오류:", error);
    }
  
    const configuration: RTCConfiguration = {
      iceServers,
    };
  
    const pc = new RTCPeerConnection(configuration);
  
    try {
      pc.addEventListener("icecandidate", (event) => {
        console.log("iceCandidate 이벤트 발생");
        onIceCandidate(event, otherKey);
      });
  
      pc.addEventListener("track", (event) => {
        console.log("track 이벤트 발생");
        onTrack(event, otherKey);
      });
  
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });
  
      console.log("송출 완료");
  
      pc.onconnectionstatechange = () => {
        if (["disconnected", "failed", "closed"].includes(pc.iceConnectionState)) {
          console.log("연결이 끊어졌습니다.");
        }
      };
    } catch (error) {
      console.error("피어 커넥션 생성 중 오류:", error);
    }
  
    console.log("만들어진 후 피어커넥션", pc);
    return pc;
  };
  

  const onTrack = (event: RTCTrackEvent, otherKey: string) => {
    setRemoteStream(event.streams[0]);
    const newVideoElement = (
      <video
        className="rounded-xl aspect-[16/9] object-cover"
        key={otherKey}
        autoPlay
        playsInline
        ref={(videoElem: HTMLVideoElement | null) => {
          if (videoElem) {
            videoElem.srcObject = event.streams[0];
          }
        }}
      />
    );
    //setVideoElements((prev) => [...prev, newVideoElement]);
    videoElements.push(newVideoElement);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>", videoElements)
  };

  const onIceCandidate = (event: RTCPeerConnectionIceEvent, otherKey: string) => {
    const peerConnection = pcListMap.get(otherKey);
    if (peerConnection && event.candidate) {
      if (client.connected) {
        client.publish({
          destination: `/app/peer/iceCandidate/${otherKey}/${roomId}`,
          body: JSON.stringify({ key: myKey, body: event.candidate }),
        });
      }
    }
  };

  const sendAnswer = async (pc: RTCPeerConnection, otherKey: string) => {
    pc.createAnswer().then(async (answer) => {
      await setLocalAndSendMessage(pc, answer).then(() => {
        if (client.connected) {
          client.publish({
            destination: `/app/peer/answer/${otherKey}/${roomId}`,
            body: JSON.stringify({ key: myKey, body: answer }),
            skipContentLengthHeader: true,
          });
        }
      });
    });
  };

  const sendOffer = async (pc: RTCPeerConnection, otherKey: string) => {
    pc.createOffer().then(async (offer) => {
      await setLocalAndSendMessage(pc, offer).then(() => {
        client.publish({
          destination: `/app/peer/offer/${otherKey}/${roomId}`,
          body: JSON.stringify({ key: myKey, body: offer }),
        });
      });
      console.log("Send offer");
    });
  };

  const setLocalAndSendMessage = async (
    pc: RTCPeerConnection,
    sessionDescription: RTCLocalSessionDescriptionInit | undefined,
  ) => {
    await pc.setLocalDescription(sessionDescription);
  };

  return {
    client: client,
    video: videoElements,
    startStream: startStream,
    startScreenStream: startScreenStream,
    remoteStream: remoteStream,
  };

  
}
