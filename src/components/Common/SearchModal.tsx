
import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Chip,
    Dialog,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AppsIcon from "@mui/icons-material/Apps";
import { useNavigate } from "react-router-dom";

import {
    getSearchResults,
    splitSearchResults,
    type SearchResult,
} from "../../utils/searchUtils";

interface SearchModalProps {
    open: boolean;
    onClose: () => void;
}

const popularSearches = [
    "ProMAN",
    "AI",
    "Risk",
    "Plan",
    "MIS",
    "Procurement",
];

// This is called destructuring props. Instead of writing props.open and props.onClose, you use open and onClose directly.
export default function SearchModal({
    open,
    onClose,
}: SearchModalProps) {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!open) {
            setQuery("");
        }
    }, [open]);

    const results = useMemo(
        () => getSearchResults(query),
        [query]
    );

    const { topSearches, relatedSearches } =
        splitSearchResults(results);

    const handleResultClick = (result: SearchResult) => {
        onClose();

        if (result.type === "functionalArea" && result.url) {
            window.open(
                result.url,
                "_blank",
                "noopener,noreferrer"
            );
            return;
        }

        navigate(result.path);
    };

    const renderResults = (items: SearchResult[]) => (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                },
                gap: 1.5,
            }}
        >
            {items.map((item) => (
                <Box
                    key={item.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleResultClick(item)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleResultClick(item);
                        }
                    }}
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.5,
                        p: 2,
                        minWidth: 0,
                        border: "1px solid #E2E7EF",
                        borderRadius: 2.5,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        "&:hover": {
                            borderColor: "#A9BDEB",
                            backgroundColor: "#F7F8FF",
                            transform: "translateY(-2px)",
                        },
                        "&:focus-visible": {
                            outline: "2px solid #5142A5",
                            outlineOffset: 2,
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: 42,
                            height: 42,
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 2,
                            backgroundColor: "#F0EFF8",
                            color: "#29216F",
                        }}
                    >
                        <AppsIcon />
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                            sx={{
                                fontSize: 15,
                                fontWeight: 700,
                                color: "#29216F",
                                overflowWrap: "anywhere",
                            }}
                        >
                            {item.title}
                        </Typography>

                        <Typography
                            sx={{
                                mt: 0.75,
                                fontSize: 12,
                                color: "#697586",
                                lineHeight: 1.6,
                            }}
                        >
                            {item.description}
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.75,
                                mt: 1.25,
                            }}
                        >
                            <Chip
                                label={item.category}
                                size="small"
                                sx={{
                                    height: 23,
                                    fontSize: 10,
                                    backgroundColor: "#F0EFF8",
                                    color: "#29216F",
                                }}
                            />

                            <Chip
                                label={item.plan}
                                size="small"
                                variant="outlined"
                                sx={{
                                    height: 23,
                                    fontSize: 10,
                                }}
                            />
                        </Box>
                    </Box>

                    <ArrowForwardIcon
                        sx={{
                            fontSize: 18,
                            color: "#98A2B3",
                            alignSelf: "center",
                            flexShrink: 0,
                        }}
                    />
                </Box>
            ))}
        </Box>
    );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth={false}
            scroll="paper"
            aria-label="Global search"
            sx={{
                "& .MuiBackdrop-root": {
                    backgroundColor: "rgba(20, 25, 40, 0.35)",
                    backdropFilter: "blur(6px)",
                },
                "& .MuiDialog-container": {
                    alignItems: "flex-start",
                    pt: { xs: 2, sm: 6, md: 9 },
                    pb: 2,
                },
            }}
            slotProps={{
                paper: {
                    sx: {
                        width: "calc(100% - 24px)",
                        maxWidth: 1000,
                        maxHeight: "85vh",
                        m: 0,
                        borderRadius: { xs: 2.5, sm: 3.5 },
                        overflow: "hidden",
                        backgroundColor: "#FFFFFF",
                    },
                },
            }}
        >
            {/* Search header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: { xs: 2, sm: 3 },
                    py: 2,
                    borderBottom: "1px solid #E9EDF3",
                }}
            >
                <SearchIcon
                    sx={{
                        fontSize: 28,
                        color: "#29216F",
                        flexShrink: 0,
                    }}
                />

                <TextField
                    autoFocus
                    fullWidth
                    variant="standard"
                    placeholder="Search products, functional areas..."
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    slotProps={{
                        input: {
                            disableUnderline: true,
                            endAdornment: query ? (
                                <InputAdornment position="end">
                                    <IconButton
                                        size="small"
                                        aria-label="Clear search"
                                        onClick={() => setQuery("")}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            ) : null,
                        },
                        htmlInput: {
                            "aria-label": "Search products and functional areas",
                        },
                    }}
                    sx={{
                        "& input": {
                            fontSize: { xs: 15, sm: 18 },
                            py: 1,
                        },
                    }}
                />

                <IconButton
                    onClick={onClose}
                    aria-label="Close search"
                >
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* Search body */}
            <Box
                sx={{
                    p: { xs: 2, sm: 3 },
                    overflowY: "auto",
                    minHeight: 180,
                }}
            >
                {!query.trim() ? (
                    <Box>
                        <Typography
                            sx={{
                                fontSize: 15,
                                fontWeight: 700,
                                mb: 2,
                                color: "#29216F",
                            }}
                        >
                            Popular Searches
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                            }}
                        >
                            {popularSearches.map((term) => (
                                <Chip
                                    key={term}
                                    label={term}
                                    clickable
                                    onClick={() => setQuery(term)}
                                    sx={{
                                        height: 36,
                                        border: "1px solid #E0E5EE",
                                        backgroundColor: "#FAFBFD",
                                        "&:hover": {
                                            backgroundColor: "#F0EFF8",
                                        },
                                    }}
                                />
                            ))}
                        </Box>

                        <Typography
                            sx={{
                                mt: 3,
                                fontSize: 12,
                                color: "#8792A2",
                            }}
                        >
                            Search across products and functional areas.
                            Use * for multiple characters or ? for one character.
                        </Typography>
                    </Box>
                ) : results.length === 0 ? (
                    <Box
                        sx={{
                            textAlign: "center",
                            py: 5,
                        }}
                    >
                        <SearchIcon
                            sx={{
                                fontSize: 40,
                                color: "#A0A9B8",
                                mb: 1,
                            }}
                        />

                        <Typography sx={{ fontWeight: 700 }}>
                            No results found
                        </Typography>

                        <Typography
                            sx={{
                                mt: 0.75,
                                color: "#697586",
                                fontSize: 13,
                            }}
                        >
                            Try another keyword or wildcard pattern.
                        </Typography>
                    </Box>
                ) : (
                    <Box>
                        <Typography
                            sx={{
                                fontSize: 12,
                                color: "#697586",
                                mb: 2,
                            }}
                        >
                            {results.length} matching results
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography
                                sx={{
                                    fontSize: 16,
                                    fontWeight: 700,
                                    color: "#29216F",
                                    mb: 1.5,
                                }}
                            >
                                Top Searches
                            </Typography>

                            {renderResults(topSearches)}
                        </Box>

                        {relatedSearches.length > 0 && (
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: 16,
                                        fontWeight: 700,
                                        color: "#29216F",
                                        mb: 1.5,
                                    }}
                                >
                                    Related Searches
                                </Typography>

                                {renderResults(relatedSearches)}
                            </Box>
                        )}
                    </Box>
                )}
            </Box>

            {/* Modal footer */}
            <Box
                sx={{
                    px: 3,
                    py: 1.25,
                    borderTop: "1px solid #E9EDF3",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                }}
            >
                <Typography
                    sx={{ fontSize: 11, color: "#8792A2" }}
                >
                    Press Esc to close
                </Typography>

                <Typography
                    sx={{ fontSize: 11, color: "#29216F" }}
                >
                    APEXMIS Search
                </Typography>
            </Box>
        </Dialog>
    );
}
