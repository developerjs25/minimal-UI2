import { Box, Typography, Stack,  Grid,  Slide, useTheme, TextField,  Button, alpha } from '@mui/material';
import {  MapPin, } from 'lucide-react';
import { Edit,} from "@mui/icons-material";
import { motion } from 'framer-motion';

const MyAccountAddress = ({userData, isEditingAddress, handleChange, handleSubmit, setIsEditingAddress}:any) => {
const theme = useTheme();
       const addressItems = [
            { label: 'City', name: 'city', value: userData.city, icon: MapPin, color: '#4ecdc4' },
            { label: 'State', name: 'stateName', value: userData.stateName, icon: MapPin, color: '#45b7d1' },
            { label: 'Country', name: 'country', value: userData.country, icon: MapPin, color: '#96ceb4' },
            { label: 'Address 1', name: 'address1', value: userData.address1, icon: MapPin, color: '#feca57' },
            { label: 'Address 2', name: 'address2', value: userData.address2, icon: MapPin, color: '#ff9ff3' }
        ]
  return (
             <Slide direction="up"  in={true} timeout={1200}>
                    <Box sx={{ p: { xs: 4, md: 6 }, borderRadius: 4, background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.4)' }}>
                        <Stack spacing={6}>
                             <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                            <Typography variant="h4" fontWeight={800} sx={{
                                position: 'relative',
                                '&::after': { content: '""', position: 'absolute', bottom: -8, left: 0, width: 60, height: 4, background: 'linear-gradient(90deg, #4ecdc4, #45b7d1)' }
                            }}>
                                Address Information
                            </Typography>
                            <Stack direction="row" gap={3}>
                                {isEditingAddress && (
                                    <Button onClick={handleSubmit} sx={{
                                        px: 4, py: 1.5, fontSize: '17px', fontWeight: 600, textTransform: 'none', borderRadius: 5, minWidth: 200, color: theme.palette.background.listColor,
                                        boxShadow: `0 8px 32px ${alpha(theme.palette.primary.dark, 0.4)}`, backgroundColor: theme.palette.background.whiteBlack,
                                        '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 16px 48px ${alpha(theme.palette.primary.dark, 0.6)}`, },
                                    }}>
                                        Save Changes
                                    </Button>
                                )}
                                <Button startIcon={<Edit />} onClick={() => setIsEditingAddress(!isEditingAddress)}
                                    sx={{
                                        px: 3, py: 1.5, fontSize: '16px', color: theme.palette.background.listColor, fontWeight: 600, textTransform: 'none', borderRadius: 4,
                                        boxShadow: "none", background: theme.palette.background.whiteBlack,
                                        '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 12px 40px ${alpha(theme.palette.primary.dark, 0.6)}`, },
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}>
                                    {isEditingAddress ? 'Cancel' : 'Edit Address'}
                                </Button>
                            </Stack>
                            </Stack>
                            <Grid container spacing={4}>
                                {addressItems.map((item, index) => (
                                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={index}>
                                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}>
                                            <Box sx={{
                                                p: 3, borderRadius: 3, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                                transition: 'all 0.3s ease',
                                                '&:hover': { background: 'rgba(255,255,255,0.1)', transform: 'translateY(-4px)', boxShadow: '0 15px 30px rgba(0,0,0,0.3)' }
                                            }}>
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Box sx={{ width: 45, height: 45, borderRadius: 2, background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <item.icon size={20} color={item.color} />
                                                    </Box>
                                                    <Box>
                                                        <Typography fontWeight={600} fontSize={16} mb={0.5}>{item.label}</Typography>
                                                        <TextField fullWidth placeholder={item.label} name={item.name}
                                                            value={userData[item.name as keyof typeof userData] || ""} onChange={handleChange} disabled={!isEditingAddress}
                                                            InputProps={{ sx: { borderRadius: 3, } }}
                                                            sx={{
                                                                '& .MuiOutlinedInput-root': {
                                                                    '& fieldset': { border: "none", },
                                                                    '&:hover fieldset': { border: "none" },
                                                                    '&.Mui-focused fieldset': { border: "none" },
                                                                },
                                                            }}
                                                        />
                                                    </Box>
                                                </Stack>
                                            </Box>
                                        </motion.div>
                                    </Grid>
                                ))}
                            </Grid>
                        </Stack>
                    </Box>
                </Slide> 
  )
}

export default MyAccountAddress
