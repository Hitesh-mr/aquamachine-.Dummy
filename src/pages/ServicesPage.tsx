// import { useState } from 'react';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import Paper from '@mui/material/Paper';
// import Alert from '@mui/material/Alert';
// import Chip from '@mui/material/Chip';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import { Link } from 'react-router-dom';
// import HomeIcon from '@mui/icons-material/Home';
// import BuildIcon from '@mui/icons-material/Build';
// import PhoneIcon from '@mui/icons-material/Phone';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import SettingsIcon from '@mui/icons-material/Settings';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import BusinessIcon from '@mui/icons-material/Business';
// import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';




// const serviceTypes = [
//   { icon: <BuildIcon sx={{ fontSize: 28 }} />, label: 'RO Servicing' },
//   { icon: <HomeRepairServiceIcon sx={{ fontSize: 28 }} />, label: 'Installation' },
//   { icon: <SettingsIcon sx={{ fontSize: 28 }} />, label: 'Repair & Maintenance' },
//   { icon: <FilterAltIcon sx={{ fontSize: 28 }} />, label: 'Filter Replacement' },
//   { icon: <BusinessIcon sx={{ fontSize: 28 }} />, label: 'Commercial Service' },
//   { icon: <AccessTimeIcon sx={{ fontSize: 28 }} />, label: 'AMC Plans' },
// ];

// const serviceAreas = ['Vashi', 'Nerul', 'Kharghar', 'Panvel', 'Belapur', 'Airoli', 'Ghansoli', 'Koparkhairane', 'Sanpada', 'Turbhe', 'Rabale', 'Mahape'];

// export default function ServicesPage() {
//   const [form, setForm] = useState({ name: '', phone: '', service: '', area: '', brand: '', message: '' });
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);
//   };

//   const formatPrice = (p: number) => `₹${p.toLocaleString('en-IN')}`;

//   return (
//     <Box sx={{ bgcolor: '#F8FBFF', minHeight: '100vh', pb: { xs: 10, md: 6 } }}>
//       {/* Hero */}
//       <Box sx={{ background: 'linear-gradient(135deg, #023E8A 0%, #0077B6 100%)', py: { xs: 5, md: 7 } }}>
//         <Container maxWidth="xl">
//           <Breadcrumbs sx={{ mb: 2, '& *': { color: 'rgba(255,255,255,0.6)' }, '& .MuiBreadcrumbs-li:last-child *': { color: '#fff' } }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }} component={Link} to="/" style={{ textDecoration: 'none' }}>
//               <HomeIcon sx={{ fontSize: 16 }} />
//               <Typography variant="caption">Home</Typography>
//             </Box>
//             <Typography variant="caption">Services</Typography>
//           </Breadcrumbs>
//           <Typography variant="h3" sx={{ color: '#fff', fontWeight: 800 }}>Our Services</Typography>
//           <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.75)', mt: 1 }}>
//             Expert RO service & installation starting at just ₹149. Certified technicians across your service area.
//           </Typography>
//         </Container>
//       </Box>

//       {/* Service Types Strip */}
//       <Box sx={{ bgcolor: '#fff', py: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
//         <Container maxWidth="xl">
//           <Grid container spacing={2} justifyContent="center">
//             {serviceTypes.map(s => (
//               <Grid key={s.label} size={{ xs: 4, sm: 2 }}>
//                 <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, p: 2 }}>
//                   <Box sx={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(0,119,182,0.1), rgba(0,180,216,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main' }}>
//                     {s.icon}
//                   </Box>
//                   <Typography variant="caption" sx={{ fontWeight: 600, textAlign: 'center', fontSize: '0.72rem' }}>{s.label}</Typography>
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       <Container maxWidth="xl" sx={{ py: 6 }}>
//         {/* Service Cards */}
//         <Box sx={{ mb: 3 }}>
//           <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 2 }}>What We Offer</Typography>
//           <Typography variant="h4" sx={{ fontWeight: 800 }}>Service Packages</Typography>
//         </Box>

//         <Grid container spacing={3} sx={{ mb: 8 }}>
//           {allServices.map(service => {
//             const discount = Math.round(((service.originalPrice - service.discountedPrice) / service.originalPrice) * 100);
//             return (
//               <Grid key={service.id} size={{ xs: 12, sm: 6, md: 4 }}>
//                 <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                   <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
//                     <Box
//                       component="img"
//                       src={service.image}
//                       alt={service.name}
//                       sx={{ width: '100%', height: 200, objectFit: 'contain', bgcolor: '#f8f9fa', p: 2, display: 'block' }}
//                       onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.src = '/ro-service-filters.webp'; }}
//                     />
//                     {discount > 0 && (
//                       <Chip label={`${discount}% OFF`} size="small" color="error" sx={{ position: 'absolute', top: 12, right: 12, fontWeight: 700 }} />
//                     )}
//                   </Box>
//                   <CardContent sx={{ flex: 1, p: 3 }}>
//                     <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>{service.name}</Typography>
//                     <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 2 }}>
//                       <Typography variant="h5" fontWeight={800} color="primary.dark">{formatPrice(service.discountedPrice)}</Typography>
//                       <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>{formatPrice(service.originalPrice)}</Typography>
//                     </Box>
//                     <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>{service.description}</Typography>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
//                       <AccessTimeIcon sx={{ fontSize: 16, color: 'primary.main' }} />
//                       <Typography variant="caption" fontWeight={600}>{service.duration}</Typography>
//                     </Box>
//                     <Typography variant="caption" fontWeight={700} sx={{ mb: 1, display: 'block', color: 'text.primary' }}>Includes:</Typography>
//                     {service.includes.map(inc => (
//                       <Box key={inc} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
//                         <CheckCircleIcon sx={{ fontSize: 14, color: 'primary.main' }} />
//                         <Typography variant="caption">{inc}</Typography>
//                       </Box>
//                     ))}
//                     <Button fullWidth variant="contained" sx={{ mt: 2.5 }} component="a" href="tel:+91XXXXXXXXXX">
//                       Book This Service
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             );
//           })}
//         </Grid>

//         {/* Service Areas */}
//         <Box sx={{ mb: 8 }}>
//           <Typography variant="h4" fontWeight={800} sx={{ mb: 2 }}>Service Areas</Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>We provide doorstep service across all major locations in your service area:</Typography>
//           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
//             {serviceAreas.map(area => (
//               <Chip
//                 key={area}
//                 label={area}
//                 variant="outlined"
//                 sx={{ fontWeight: 600, '&:hover': { borderColor: 'primary.main', color: 'primary.main', bgcolor: 'rgba(0,119,182,0.04)' } }}
//               />
//             ))}
//           </Box>
//         </Box>

//         {/* Booking Form */}
//         <Grid container spacing={5} alignItems="flex-start">
//           <Grid size={{ xs: 12, md: 5 }}>
//             <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 2 }}>Quick Booking</Typography>
//             <Typography variant="h4" fontWeight={800} sx={{ mb: 2 }}>Schedule a Service Visit</Typography>
//             <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
//               Book your service online or call us directly. Our technicians will reach you within 2 hours of booking during business hours.
//             </Typography>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
//               {[
//                 { label: 'Mon–Sat: 9 AM – 7 PM', icon: <AccessTimeIcon sx={{ fontSize: 18 }} /> },
//                 { label: 'Certified & Background-Verified Technicians', icon: <CheckCircleIcon sx={{ fontSize: 18 }} /> },
//                 { label: 'Covers All Brands & Models', icon: <BuildIcon sx={{ fontSize: 18 }} /> },
//               ].map(item => (
//                 <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                   <Box sx={{ color: 'primary.main' }}>{item.icon}</Box>
//                   <Typography variant="body2" fontWeight={500}>{item.label}</Typography>
//                 </Box>
//               ))}
//             </Box>
//             <Button
//               variant="contained"
//               size="large"
//               fullWidth
//               component="a"
//               href="tel:+91XXXXXXXXXX"
//               startIcon={<PhoneIcon />}
//               sx={{ mb: 2 }}
//             >
//               Call Now: +91 XXXXX XXXXX
//             </Button>
//           </Grid>

//           <Grid size={{ xs: 12, md: 7 }}>
//             <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'rgba(0,119,182,0.1)', boxShadow: '0 8px 40px rgba(0,119,182,0.08)' }}>
//               {submitted ? (
//                 <Alert severity="success" icon={<CheckCircleIcon />} sx={{ borderRadius: 2 }}>
//                   <Typography variant="body1" fontWeight={700}>Booking Submitted!</Typography>
//                   <Typography variant="body2">We'll call you at <strong>{form.phone}</strong> within 30 minutes to confirm your appointment. For urgent help call us at +91 XXXXX XXXXX.</Typography>
//                 </Alert>
//               ) : (
//                 <Box component="form" onSubmit={handleSubmit}>
//                   <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>Book a Service Visit</Typography>
//                   <Grid container spacing={2.5}>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                       <TextField required fullWidth label="Full Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                       <TextField required fullWidth label="Phone Number" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                       <TextField select required fullWidth label="Service Type" value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))}>
//                         {['RO Regular Servicing', 'New Installation', 'Un-Installation & Re-Installation', 'Filter Replacement', 'AMC Package', 'Commercial Service', 'Repair'].map(s => (
//                           <MenuItem key={s} value={s}>{s}</MenuItem>
//                         ))}
//                       </TextField>
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                       <TextField select required fullWidth label="Area" value={form.area} onChange={e => setForm(p => ({ ...p, area: e.target.value }))}>
//                         {serviceAreas.map(a => <MenuItem key={a} value={a}>{a}</MenuItem>)}
//                       </TextField>
//                     </Grid>
//                     <Grid size={{ xs: 12 }}>
//                       <TextField fullWidth label="Purifier Brand & Model (Optional)" value={form.brand} onChange={e => setForm(p => ({ ...p, brand: e.target.value }))} placeholder="e.g. Kent Grand Plus" />
//                     </Grid>
//                     <Grid size={{ xs: 12 }}>
//                       <TextField fullWidth multiline rows={3} label="Additional Details" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
//                     </Grid>
//                     <Grid size={{ xs: 12 }}>
//                       <Button type="submit" variant="contained" size="large" fullWidth endIcon={<ArrowForwardIcon />}>
//                         Submit Booking Request
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               )}
//             </Paper>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// }
