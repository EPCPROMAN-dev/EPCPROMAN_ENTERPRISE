
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface SubscriptionAccessModalProps {
    open: boolean;
    onClose: () => void;
    productCode: string;
    name: string;
    code: string;
}

export default function SubscriptionAccessModal({
    open,
    onClose,
    productCode,
    name,
    code,
}: SubscriptionAccessModalProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            // fullWidth =""
            slotProps={{
                paper: {
                  sx: {
                    borderRadius: 5,
                    p: 1.5,
                    maxWidth: 550,
                  },
                },
            }}
        >
            <DialogContent sx={{ p: 2 }}>
                <Typography
                    sx={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: "#1769d2",
                        letterSpacing: 1,
                    }}
                >
                    SUBSCRIPTION ACCESS
                </Typography>

                <Typography
                    sx={{
                        mt: 1.5,
                        fontSize: 25,
                        fontWeight: 800,
                        color: "#17385f",
                        lineHeight: 1.35,
                    }}
                >
                    {name}
                </Typography>

                <Typography
                    sx={{
                        mt: 1,
                        fontSize: 12,
                        color: "#667b98",
                        lineHeight: 1.8,
                    }}
                >
                    This application requires a separate license
                    and is not included automatically with your
                    current subscription.
                </Typography>

                <Box
                    sx={{
                        mt: 2,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: "#f4f7fb",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 12,
                            fontWeight: 800,
                            color: "#405773",
                        }}
                    >
                        {productCode} · {code}
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.5,
                            fontSize: 12,
                            color: "#405773",
                            lineHeight: 1.6,
                        }}
                    >
                        A license is required to access this
                        application. Please contact your
                        administrator to purchase or activate
                        the required add-on.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 3,
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={onClose}
                        sx={{
                            textTransform: "none",
                            fontWeight: 700,
                            borderRadius: 2,
                            px: 2,
                            color: "#17385f",
                            borderColor: "#cbdcf1",
                        }}
                    >
                        Close
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
