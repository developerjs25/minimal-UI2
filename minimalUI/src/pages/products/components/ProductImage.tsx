// import React, { useState, useEffect } from "react";
// import { Box, Typography, Paper, Stack, } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import Image from "../../../constants/Images";
// import Toaster from "../../../components/toaster";
// import type { ImageBoxProps } from "../../../Types";

// const ProductImage: React.FC<ImageBoxProps> = ({ imageName, error = false, onChange, }) => {
//     const [preview, setPreview] = useState<string>("");
//     const [toast, setToast] = useState({ open: false, message: "", type: "", });
//     const theme = useTheme();

//     useEffect(() => {
//         if (imageName && typeof imageName === "string") {
//             setPreview(imageName);
//         }
//     }, [imageName]);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const selectedFile = event.target.files?.[0];
//         if (!selectedFile) return;

//         const allowedTypes = [
//             "image/jpeg",
//             "image/jpg",
//             "image/png",
//             "image/gif",
//             "image/webp",
//         ];

//         if (!allowedTypes.includes(selectedFile.type)) {
//             setToast({
//                 open: true,
//                 message: "Only JPG, JPEG, PNG, GIF, and WEBP files are allowed",
//                 type: "error",
//             });
//             return;
//         }

//         const reader = new FileReader();

//         reader.onloadend = () => {
//             const result = reader.result as string;

//             setPreview(result);

//             if (onChange) {
//                 onChange?.({
//                     imageName: selectedFile.name,
//                 });
//             }
           
//         };
//         reader.readAsDataURL(selectedFile);
//     };

//     return (
//         <>
//             <Box sx={{ width: "100%" }}>
//                 <Typography fontWeight={600} mb={1.5} fontSize={14}>Product Image</Typography>
//                 <Paper elevation={0} sx={{
//                     height: 320, borderRadius: 4, border: error ? "2px dashed red" : "2px dashed #d0d5dd", backgroundColor: theme.palette.background.default, position: "relative",
//                     overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", transition: "0.3s",
//                     "&:hover": { borderColor: theme.palette.primary.main, backgroundColor: theme.palette.background.default, },
//                 }}>
//                     <input type="file" accept="image/*" onChange={handleFileChange} style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", zIndex: 2, }} />

//                     {preview ? (
//                         <Box component="img" src={preview} alt="preview" sx={{ width: "100%", height: "100%", objectFit: "cover", }} />
//                     ) : (
//                         <Stack alignItems="center" spacing={2}>
//                             <Box component="img" src={Image.imageinput} sx={{ width: 120, opacity: 0.9, }} />
//                             <Box textAlign="center">
//                                 <Typography fontWeight={700} fontSize={16} > Drop or Select File </Typography>
//                                 <Typography variant="body2" color="text.secondary" > Upload product thumbnail</Typography>
//                             </Box>
//                         </Stack>
//                     )}
//                 </Paper>
//             </Box>

//             <Toaster openToast={toast.open} setOpenToast={(open: boolean) => setToast({ ...toast, open })} contant={toast.message} color={toast.type}
//             />
//         </>
//     );
// };

// export default ProductImage;

// import React, { useState, useEffect } from "react";
// import { Box, Typography, Paper, Stack } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import Image from "../../../constants/Images";
// import Toaster from "../../../components/toaster";
// import type { ImageBoxProps } from "../../../Types";

// const ProductImage: React.FC<ImageBoxProps> = ({
//   image,
//   error = false,
//   onChange,
// }) => {
//   const [preview, setPreview] = useState<string>("");
//   const [toast, setToast] = useState({
//     open: false,
//     message: "",
//     type: "",
//   });

//   const theme = useTheme();

//   useEffect(() => {
//     if (image && typeof image === "string") {
//       setPreview(image);
//     }
//   }, [image]);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = event.target.files?.[0];
//     if (!selectedFile) return;

//     const allowedTypes = [
//       "image/jpeg",
//       "image/jpg",
//       "image/png",
//       "image/gif",
//       "image/webp",
//     ];

//     if (!allowedTypes.includes(selectedFile.type)) {
//       setToast({
//         open: true,
//         message: "Only JPG, JPEG, PNG, GIF, and WEBP files are allowed",
//         type: "error",
//       });
//       return;
//     }

//     const reader = new FileReader();

//     reader.onloadend = () => {
//       const result = reader.result as string;

//       setPreview(result);

//       // ✅ send ONLY filename
//       if (onChange) {
//         onChange(selectedFile.name);
//       }
//     };

//     reader.readAsDataURL(selectedFile);
//   };

//   return (
//     <>
//       <Box sx={{ width: "100%" }}>
//         <Typography fontWeight={600} mb={1.5} fontSize={14}>
//           Product Image
//         </Typography>

//         <Paper
//           elevation={0}
//           sx={{
//             height: 320,
//             borderRadius: 4,
//             border: error ? "2px dashed red" : "2px dashed #d0d5dd",
//             backgroundColor: theme.palette.background.default,
//             position: "relative",
//             overflow: "hidden",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             transition: "0.3s",
//             "&:hover": {
//               borderColor: theme.palette.primary.main,
//             },
//           }}
//         >
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             style={{
//               position: "absolute",
//               inset: 0,
//               opacity: 0,
//               cursor: "pointer",
//               zIndex: 2,
//             }}
//           />

//           {preview ? (
//             <Box
//               component="img"
//               src={preview}
//               alt="preview"
//               sx={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//               }}
//             />
//           ) : (
//             <Stack alignItems="center" spacing={2}>
//               <Box
//                 component="img"
//                 src={Image.imageinput}
//                 sx={{ width: 120, opacity: 0.9 }}
//               />
//               <Box textAlign="center">
//                 <Typography fontWeight={700} fontSize={16}>
//                   Drop or Select File
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Upload product thumbnail
//                 </Typography>
//               </Box>
//             </Stack>
//           )}
//         </Paper>
//       </Box>

//       <Toaster
//         openToast={toast.open}
//         setOpenToast={(open: boolean) =>
//           setToast({ ...toast, open })
//         }
//         contant={toast.message}
//         color={toast.type}
//       />
//     </>
//   );
// };

// export default ProductImage;
import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { ImageBoxProps } from "../../../Types";
import Images from "../../../constants/Images";
import Toaster from "../../../components/toaster";

const ProductImage: React.FC<ImageBoxProps> = ({
  image,
  error = false,
  onChange,
}) => {
  const [preview, setPreview] = useState("");
   const [toast, setToast] = useState({ open: false, message: "", type: "", });
  const theme = useTheme();

  useEffect(() => {
    if (image) {
      setPreview(`http://localhost:3003/uploads/${image}`);
    }
  }, [image]);

 const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFile = event.target.files?.[0];
  if (!selectedFile) return;

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

      if (!allowedTypes.includes(selectedFile.type)) {
            setToast({
                open: true,
                message: "Only JPG, JPEG, PNG, GIF, and WEBP files are allowed",
                type: "error",
            });
            return;
        }

  const reader = new FileReader();

  reader.onloadend = () => {
    const result = reader.result as string;
    setPreview(result);
  };

  reader.readAsDataURL(selectedFile);


  onChange?.(selectedFile);
};

  return (
   <>
            <Box sx={{ width: "100%" }}>
           <Typography fontWeight={600} mb={1.5} fontSize={14}>Product Image</Typography>
                 <Paper elevation={0} sx={{
                    height: 320, borderRadius: 4, border: error ? "2px dashed red" : "2px dashed #d0d5dd", backgroundColor: theme.palette.background.default, position: "relative",
                    overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", transition: "0.3s",
                    "&:hover": { borderColor: theme.palette.primary.main, backgroundColor: theme.palette.background.default, },
                }}>
                    <input type="file" accept="image/*" onChange={handleFileChange} style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", zIndex: 2, }} />

                    {preview ? (
                        <Box component="img" src={preview} alt="preview" sx={{ width: "100%", height: "100%", objectFit: "cover", }} />
                    ) : (
                        <Stack alignItems="center" spacing={2}>
                            <Box component="img" src={Images.imageinput} sx={{ width: 120, opacity: 0.9, }} />
                            <Box textAlign="center">
                                <Typography fontWeight={700} fontSize={16} > Drop or Select File </Typography>
                                <Typography variant="body2" color="text.secondary" > Upload product thumbnail</Typography>
                            </Box>
                        </Stack>
                    )}
                </Paper>
            </Box>

            <Toaster openToast={toast.open} setOpenToast={(open: boolean) => setToast({ ...toast, open })} contant={toast.message} color={toast.type}
            />
        </>
  );
};

export default ProductImage;