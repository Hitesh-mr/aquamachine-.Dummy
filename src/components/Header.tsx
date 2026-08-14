import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MenuIcon from '@mui/icons-material/Menu';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CloseIcon from '@mui/icons-material/Close';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

const navLinks = [
  { label: 'Home', section: 'hero' },
  { label: 'Products', section: 'products' },
  { label: 'Services', section: 'services' },
  { label: 'About Us', section: 'about' },
  { label: 'Contact', section: 'contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 50 });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={trigger ? 4 : 0}
        sx={{
          bgcolor: trigger ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: trigger ? 'none' : '1px solid rgba(0,119,182,0.08)',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ maxWidth: 1280, mx: 'auto', width: '100%', px: { xs: 2, md: 3 }, py: 1 }}>
          {/* Logo */}
          <Box onClick={() => scrollToSection('hero')} sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', mr: 4, cursor: 'pointer' }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0,119,182,0.3)',
              }}
            >
              {/* <WaterDropIcon sx={{ color: '#fff', fontSize: 22 }} /> */}
         <img src="/logo.jpeg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: 'primary.dark', fontWeight: 800, lineHeight: 1.1, fontSize: '1.1rem' }}>
                Aqua Machines
              </Typography>
              <Typography variant="caption" sx={{ color: 'secondary.main', fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', fontSize: '0.6rem' }}>
                Solutions
              </Typography>
            </Box>
          </Box>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5, flex: 1 }}>
            {navLinks.map(link => (
              <Button
                key={link.section}
                onClick={() => scrollToSection(link.section)}
                sx={{
                  color: 'text.primary',
                  fontWeight: 500,
                  fontSize: '0.88rem',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: 'rgba(0,119,182,0.06)',
                    transform: 'none',
                    boxShadow: 'none',
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
            {/* Desktop WhatsApp button */}
            <Button
              component="a"
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              variant="contained"
              size="small"
              startIcon={<WhatsAppIcon />}
              sx={{ 
                display: { xs: 'none', md: 'flex' },
                ml: 1,
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #128C7E 0%, #075E54 100%)',
                }
              }}
            >
              WhatsApp
            </Button>

            {/* Mobile WhatsApp icon button */}
            <IconButton
              component="a"
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              sx={{ 
                display: { xs: 'flex', md: 'none' },
                color: '#25D366',
                p: 0.5,
              }}
            >
              <WhatsAppIcon sx={{ fontSize: 24 }} />
            </IconButton>

            {/* Mobile menu button */}
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary', p: 0.5 }}
            >
              <MenuIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 280, pt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 32, height: 32, background: 'linear-gradient(135deg, #0077B6, #00B4D8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <WaterDropIcon sx={{ color: '#fff', fontSize: 18 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.dark', fontSize: '1rem' }}>Aqua Machines</Typography>
            </Box>
            <IconButton onClick={() => setMobileOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {navLinks.map(link => (
              <ListItem key={link.section} disablePadding>
                <ListItemButton
                  onClick={() => {
                    scrollToSection(link.section);
                    setMobileOpen(false);
                  }}
                  sx={{ py: 1.5, px: 3, '&:hover': { bgcolor: 'rgba(0,119,182,0.06)', color: 'primary.main' } }}
                >
                  <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 500 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ p: 3 }}>
            <Button
              fullWidth
              variant="contained"
              component="a"
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              startIcon={<WhatsAppIcon />}
              sx={{ 
                mb: 2,
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #128C7E 0%, #075E54 100%)',
                }
              }}
            >
               WhatsApp
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                scrollToSection('contact');
                setMobileOpen(false);
              }}
            >
              Enquire Now
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}