import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Paper, Button, IconButton, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "../../../constants/Images";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDropzone } from "react-dropzone";
import { ListButton } from "../../../components/button/CustomButton";
import { UserInputField } from "../../../components/input/CustomInput";
import type { ProductFormProps } from "../../../Types";
import { useTheme } from "@mui/material/styles";

const ProductDetails: React.FC<ProductFormProps> = ({ ProductName, Productdescription, ProductContent }) => {
    const [files, setFiles] = useState<File[]>([]);
    const theme = useTheme();


    const onDrop = (acceptedFiles: File[]) => {
        setFiles((prev) => [...prev, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const removeImage = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const removeAll = () => {
        setFiles([]);
    };

    return (
        <Box p={3}>
            <Accordion defaultExpanded sx={{ borderRadius: "14px !important", boxShadow: "0 5px 14px rgba(133, 131, 131, 0.12)", backgroundColor: theme.palette.background.listColor, }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3 }}>
                    <Box>
                        <Typography fontWeight={600} fontSize={18}>Details</Typography>
                        <Typography variant="body2" color="text.secondary" paddingTop={1}>Title, short description, image...</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ borderTop: "1px solid #919eab33", }}>
                    <Stack spacing={3} my={3}>
                        <UserInputField PlaceHolder="Product name" value={ProductName} />
                        <UserInputField PlaceHolder="Sub description" value={Productdescription} row={4} />
                    </Stack>

                    <Typography fontWeight={500} mb={1}>Content</Typography>

                    <Paper sx={{ borderRadius: 2, backgroundColor: "#919eab14", }}>
                        <UserInputField PlaceHolder=" Write something awesome..." value={ProductContent} row={6} />
                    </Paper>
                    <Box mt={4}>
                        <Typography fontWeight={600} mb={1} fontSize={14}>Images</Typography>
                        <Paper variant="outlined" {...getRootProps()} sx={{
                            height: 250, display: "flex", flexDirection: "column", alignItems: "center",
                            justifyContent: "center", border: files.length === 0 ? "1px dashed #919eab33" : files.length < 2 ? "1px dashed #ff5630" : "1px dashed #919eab33", backgroundColor: files.length < 2 && files.length > 0 ? "#ff563014" : "#919eab14", borderRadius: 2,
                        }} >
                            <input {...getInputProps()} />
                            <Box component="img" src={Image.imageinput} alt="inputimage" sx={{ width: 200 }} />
                            <Typography fontWeight={600} fontSize={18}
                                color={files.length < 2 && files.length > 0 ? "#ff5630" : "text.primary"}>Drop or select files</Typography>
                            <Typography fontSize={13} color="#637381">Drag files here, or <span style={{ color: "#00a76f", }}>browse</span> your device.</Typography>
                        </Paper>
                        {files.length > 0 && files.length < 2 && (
                            <Typography color="#ff5630" mt={1} fontSize={13}>Must have at least 2 items!</Typography>
                        )}
                        <Box mt={3} display="flex" gap={2} flexWrap="wrap">
                            {files.map((file, index) => (
                                <Box key={index} sx={{ width: 80, height: 80, position: "relative", borderRadius: 2, overflow: "hidden", }} >
                                    <img src={URL.createObjectURL(file)} style={{ width: "100%", height: "100%", objectFit: "cover", }} />
                                    <IconButton size="small" onClick={() => removeImage(index)} sx={{ position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,0.5)", color: "#fff", }}><CloseIcon sx={{ fontSize: 16 }} /></IconButton>
                                </Box>
                            ))}
                        </Box>
                        {files.length > 0 && (
                            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                                <Button variant="contained" onClick={removeAll} sx={{ height: 35, mt: 2, textTransform: "none", borderRadius: 2, fontWeight: 600, bgcolor: "white.main", color: "black.main", boxShadow: "none", border: "1px solid #919eab52", "&:hover": { boxShadow: "none", border: "2px solid black" } }}>Remove All</Button>
                                <ListButton contant="Upload" icon={<CloudUploadIcon />} />
                            </Box>
                        )}
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default ProductDetails;


// import React, { useState } from "react";
// import { Box, Typography, Paper, Button, IconButton } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { useDropzone } from "react-dropzone";

// export default function ImageUpload() {
//   const [files, setFiles] = useState<File[]>([]);

//   const onDrop = (acceptedFiles: File[]) => {
//     setFiles((prev) => [...prev, ...acceptedFiles]);
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   const removeImage = (index: number) => {
//     setFiles(files.filter((_, i) => i !== index));
//   };

//   const removeAll = () => {
//     setFiles([]);
//   };

//   return (
//     <Box>

//       <Typography fontWeight={600} mb={2}>
//         Images
//       </Typography>

//       {/* Drag Drop Area */}
//       <Paper
//   {...getRootProps()}
//   sx={{
//     border: files.length < 2 ? "2px dashed #ff5630" : "2px dashed #dfe3e8",
//     backgroundColor: files.length < 2 ? "#fff4f2" : "#f9fafb",
//     borderRadius: 2,
//     textAlign: "center",
//     py: 6,
//     cursor: "pointer",
//     transition: "all 0.2s ease",
//   }}
// >
//   <input {...getInputProps()} />

//   <Typography
//     variant="h6"
//     color={files.length < 2 ? "#ff5630" : "text.primary"}
//   >
//     Drop or select files
//   </Typography>

//   <Typography color="text.secondary">
//     Drag files here, or <span style={{ color: "#00a76f" }}>browse</span> your device.
//   </Typography>
// </Paper>

//       {/* Validation Text */}
//       {files.length < 2 && (
//         <Typography color="#ff5630" mt={1} fontSize={13}>
//           Must have at least 2 items!
//         </Typography>
//       )}

//       {/* Preview Images */}
//       <Box mt={3} display="flex" gap={2} flexWrap="wrap">
//         {files.map((file, index) => (
//           <Box
//             key={index}
//             sx={{
//               width: 80,
//               height: 80,
//               position: "relative",
//               borderRadius: 2,
//               overflow: "hidden",
//             }}
//           >
//             <img
//               src={URL.createObjectURL(file)}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//               }}
//             />

//             <IconButton
//               size="small"
//               onClick={() => removeImage(index)}
//               sx={{
//                 position: "absolute",
//                 top: 4,
//                 right: 4,
//                 background: "rgba(0,0,0,0.5)",
//                 color: "#fff",
//               }}
//             >
//               <CloseIcon sx={{ fontSize: 16 }} />
//             </IconButton>
//           </Box>
//         ))}
//       </Box>

//       {/* Buttons */}
//       <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
//         <Button variant="outlined" onClick={removeAll}>
//           Remove All
//         </Button>

//         <Button
//           variant="contained"
//           startIcon={<CloudUploadIcon />}
//         >
//           Upload
//         </Button>
//       </Box>

//     </Box>
//   );
// }