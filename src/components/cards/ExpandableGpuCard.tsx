
import GpuCardContainer from "./GpuCardContainer";
import GpuCardHeader from "./GpuCardHeader";
import GpuCardPriceSection from "./GpuCardPriceSection";
import GpuCardStatusLocation from "./GpuCardStatusLocation";
import GpuCardExpandedContent from "./GpuCardExpandedContent";

interface ExpandableGpuCardProps {
  gpu: any;
  className?: string;
  onExpansionChange?: (state: any) => void;
  onInteractionModeChange?: (mode: any) => void;
}

const ExpandableGpuCard = ({ 
  gpu, 
  className = "",
  onExpansionChange,
  onInteractionModeChange 
}: ExpandableGpuCardProps) => {
  return (
    <GpuCardContainer className={className}>
      {(isHovered: boolean) => (
        <>
          <GpuCardHeader gpu={gpu} isHovered={isHovered} />
          <GpuCardPriceSection gpu={gpu} />
          <GpuCardStatusLocation gpu={gpu} />
          {isHovered && <GpuCardExpandedContent gpu={gpu} />}
        </>
      )}
    </GpuCardContainer>
  );
};

export default ExpandableGpuCard;
