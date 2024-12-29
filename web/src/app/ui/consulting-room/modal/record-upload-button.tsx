import { endConsultingRoom } from "@/app/business/consulting-room/consulting-room-end";
import { useConsultingRoomStore } from "@/app/stores/consulting-room.provider";
import AchromaticButton from "../../component/atom/button/achromatic-button";

export function RecordAndUploadButton({ stopAndUpload }: { stopAndUpload: () => Promise<string> }){
    const consultingRoomId = useConsultingRoomStore((state)=>state.consultingRoomId);
    const tellerId = useConsultingRoomStore((state)=>state.tellerId);
    const customerId = useConsultingRoomStore((state)=>state.customerId);
    const categoryId = useConsultingRoomStore((state) => state.categoryId);
    const recordChat = useConsultingRoomStore((state) => state.recordChat);
  
    const handleEndConsultation = async () => {
      try {
        const voiceUrl = await stopAndUpload();
        console.log("녹음 종료 및 업로드 완료: VoiceUrl:", voiceUrl);
        alert(`녹음 종료 및 업로드가 완료되었습니다! URL: ${voiceUrl}`);
        const customerIds = [customerId];
        const time = new Date().toISOString();
        const requestData = {
          consultingRoomId,
          tellerId,
          categoryId,
          customerIds,
          recordChat,
          voiceUrl,
          time,
        };
        console.log(requestData);
  
        const response = await endConsultingRoom(requestData);
        if (response.isSuccess) {
          console.log("상담 종료 처리 성공:", response.data);
          alert("상담 종료가 성공적으로 처리되었습니다.");
        } else {
          console.error("상담 종료 처리 실패");
          alert("상담 종료 처리에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("녹음 종료 및 업로드 중 에러 발생:", error);
        alert("녹음 업로드에 실패했습니다. 다시 시도해주세요.");
      }
    };

    return (
      <>
        <AchromaticButton
          className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3 text-black"
          onClick={handleEndConsultation}
        >녹음 업로드</AchromaticButton>
      </>
    )
}