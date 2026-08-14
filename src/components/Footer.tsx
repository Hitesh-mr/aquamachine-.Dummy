import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
// import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const quickLinks = [
  { label: 'Home', section: 'hero' },
  { label: 'Products', section: 'products' },
  { label: 'Services', section: 'services' },
  { label: 'About Us', section: 'about' },
  { label: 'Contact', section: 'contact' },
  { label: 'Privacy Policy', href: '#', external: true },
  { label: 'Terms & Conditions', href: '#', external: true },
  { label: 'Refund & Cancellation Policy', href: '#', external: true },
  { label: 'Disclaimer', href: '#', external: true },
];

const services = [
  'RO Regular Servicing',
  'New Installation',
  'Un-Installation',
  'Re-Installation',
  'Filter Replacement',
  'AMC Packages',
  'Commercial RO Plants',
];

const productCategories = [
  'Domestic RO Purifiers',
  'UV Water Purifiers',
  'Commercial RO Plants',
  'Industrial RO Plants',
  'Accessories & Parts',
  'Kangan Products',
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(180deg, #0D1B2A 0%, #023E8A 100%)',
        color: '#fff',
        pt: { xs: 6, md: 8 },
        pb: { xs: 10, md: 4 },
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          {/* Brand Column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box sx={{ width: 44, height: 44, background: 'linear-gradient(135deg, #00B4D8, #90E0EF)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <WaterDropIcon sx={{ color: '#023E8A', fontSize: 24 }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>Aqua Machines</Typography>
                <Typography variant="caption" sx={{ color: '#90E0EF', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', fontSize: '0.65rem' }}>Solutions</Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, mb: 3, maxWidth: 300 }}>
              Your trusted water purification partner. Serving your area with premium RO purifiers and expert services.
            </Typography>

            {/* Contact Info */}
            <Stack spacing={2} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <PhoneIcon sx={{ fontSize: 18, color: '#00B4D8', mt: 0.2 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>+91 XXXXX XXXXX</Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>Mon–Sun, 9AM–7PM</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <LocationOnIcon sx={{ fontSize: 18, color: '#00B4D8', mt: 0.2 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>Your Service Area</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <AccessTimeIcon sx={{ fontSize: 18, color: '#00B4D8', mt: 0.2 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>Service Hours: 9AM – 7PM, Mon–Sun</Typography>
              </Box>
            </Stack>

            {/* Social */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[
                { icon: <FacebookIcon />, href: '#' },
                { icon: <InstagramIcon />, href: '#' },
                { icon: <WhatsAppIcon />, href: 'https://wa.me/91XXXXXXXXXX' },
              ].map((s, i) => (
                <Box
                  key={i}
                  component="a"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    width: 36, height: 36,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    '&:hover': { bgcolor: '#00B4D8', color: '#fff', transform: 'translateY(-2px)' },
                    '& svg': { fontSize: 18 },
                  }}
                >
                  {s.icon}
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', mb: 2.5, position: 'relative', '&::after': { content: '""', display: 'block', mt: 1, width: 30, height: 2, bgcolor: '#00B4D8', borderRadius: 1 } }}>
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              {quickLinks.map(l => (
                <Typography
                  key={l.label}
                  component="a"
                  href={l.external ? l.href : `#${l.section}`}
                  target={l.external ? '_blank' : undefined}
                  rel={l.external ? 'noopener noreferrer' : undefined}
                  variant="body2"
                  sx={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', transition: 'color 0.2s', '&:hover': { color: '#90E0EF' } }}
                >
                  {l.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Services */}
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', mb: 2.5, position: 'relative', '&::after': { content: '""', display: 'block', mt: 1, width: 30, height: 2, bgcolor: '#00B4D8', borderRadius: 1 } }}>
              Our Services
            </Typography>
            <Stack spacing={1.5}>
              {services.map(s => (
                <Typography key={s} variant="body2" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                  {s}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Products */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', mb: 2.5, position: 'relative', '&::after': { content: '""', display: 'block', mt: 1, width: 30, height: 2, bgcolor: '#00B4D8', borderRadius: 1 } }}>
              Products
            </Typography>
            <Stack spacing={1.5} sx={{ mb: 3 }}>
              {productCategories.map(p => (
                <Typography key={p} variant="body2" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                  {p}
                </Typography>
              ))}
            </Stack>
            {/* <Button
              fullWidth
              variant="contained"
              component="a"
              href="tel:+91XXXXXXXXXX"
              startIcon={<PhoneIcon />}
              sx={{ background: 'linear-gradient(135deg, #00B4D8, #0077B6)', '&:hover': { background: 'linear-gradient(135deg, #90E0EF, #00B4D8)' } }}
            >
              Call: +91 XXXXX XXXXX
            </Button> */}
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
             All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', textAlign: 'center', maxWidth: 600 }}>
            Designed & Developed by Hitesh Prajapati
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
