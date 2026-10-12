
import Tooltip, { type TooltipProps } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const StyledTooltip = styled(
    ({ className, ...props }: TooltipProps) => (
        <Tooltip
            {...props}
            classes={{ popper: className }}
        />
    )
)(() => ({
    [`& .MuiTooltip-tooltip`]: {
        backgroundColor: "#17385f",
        color: "#ffffff",
        fontSize: "11px",
        fontWeight: 500,
        padding: "8px 11px",
        borderRadius: "6px",
        maxWidth: "240px",
        lineHeight: 1.4,
        boxShadow: "0 4px 12px rgba(23, 56, 95, 0.18)",
    },

    [`& .MuiTooltip-arrow`]: {
        color: "#17385f",
    },
}));

export default function CustomTooltip({
    children,
    ...props
}: TooltipProps) {
    return (
        <StyledTooltip
            arrow
            placement="right"
            {...props}
        >
            {children}
        </StyledTooltip>
    );
}
