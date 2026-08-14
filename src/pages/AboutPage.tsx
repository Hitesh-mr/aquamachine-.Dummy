import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


  

const values = [
  { title: 'Quality First', desc: 'We source and supply only the highest quality purifiers, tested for performance and durability.' },
  { title: 'Customer Focused', desc: 'Your satisfaction is our priority. We\'re available 6 days a week to help with any need.' },
  { title: 'Affordable Pricing', desc: 'We believe clean water is a right, not a luxury. Our pricing reflects that commitment.' },
  { title: 'Expert Service', desc: 'Our certified technicians bring years of experience and genuine care to every visit.' },
];

const products_range = [
  'Reverse Osmosis Systems', 'Domestic UV Water Purifiers', 'Domestic RO Water Purifiers',
  'Ultra Filtration & R.O. Plants', 'Swimming Pool Treatment', 'Sand Filters & Carbon Filters',
  'Softeners & D.M Plants', 'Water Ozonators', 'U-V Purifiers', 'Mineral Water Plants',
  'Commercial RO Plants', 'Industrial Purification Systems',
];

export default function AboutPage() {
  return (
    <Box sx={{ bgcolor: '#F8FBFF', minHeight: '100vh', pb: { xs: 10, md: 6 } }}>
      {/* Hero */}
      <Box sx={{ background: 'linear-gradient(135deg, #023E8A 0%, #0077B6 100%)', py: { xs: 5, md: 7 } }}>
        <Container maxWidth="xl">
          <Breadcrumbs sx={{ mb: 2, '& *': { color: 'rgba(255,255,255,0.6)' }, '& .MuiBreadcrumbs-li:last-child *': { color: '#fff' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }} component={Link} to="/" style={{ textDecoration: 'none' }}>
              <HomeIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption">Home</Typography>
            </Box>
            <Typography variant="caption">About Us</Typography>
          </Breadcrumbs>
          <Typography variant="h3" sx={{ color: '#fff', fontWeight: 800 }}>About Aqua Machines Solutions</Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.75)', mt: 1 }}>
            Your trusted water purification partner
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* Story */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 2 }}>Our Story</Typography>
            <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>We've Been Purifying Water</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.9 }}>
              Welcome to Aqua Machines Water Purifier — your gateway to pristine, delicious water, effortlessly delivered right to your home!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.9 }}>
              Aqua Machines Solutions has built a robust reputation as a leading water purification company in your service area. We specialize in water filter supplies and comprehensive water purification services at affordable cost, ensuring you save both time and money.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.9 }}>
              As a one-stop solution for all your water purifier service needs, we cater to a wide range of RO, UV, and other purification systems. Trust us for expert installation, servicing, and maintenance, ensuring your access to clean, pure, and safe water, always.
            </Typography>
            <Button variant="contained" size="large" component={Link} to="/contact" endIcon={<ArrowForwardIcon />}>
              Get in Touch
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: 'relative' }}>
              <Box
                component="img"
                src="/family-drinking-water.webp"
                alt="Aqua Machines team serving customers"
                sx={{ width: '100%', borderRadius: 4, boxShadow: '0 20px 60px rgba(0,119,182,0.15)', display: 'block' }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src = '/placeholder-image.jpg';
                }}
              />
              {/* Stats overlay */}
              <Paper elevation={3} sx={{ position: 'absolute', bottom: -20, right: -20, p: 2.5, borderRadius: 3, textAlign: 'center', minWidth: 140 }}>
                <Typography variant="h4" fontWeight={800} color="primary.main">9+</Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>Years of Trust</Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        
        

        {/* Values */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 2 }}>Our Values</Typography>
            <Typography variant="h3" fontWeight={800}>What Drives Us</Typography>
          </Box>
          <Grid container spacing={3}>
            {values.map(v => (
              <Grid key={v.title} size={{ xs: 12, sm: 6 }}>
                <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'grey.100', height: '100%', transition: 'all 0.3s', '&:hover': { borderColor: 'primary.light', boxShadow: '0 8px 30px rgba(0,119,182,0.08)' } }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 28, flexShrink: 0, mt: 0.5 }} />
                    <Box>
                      <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>{v.title}</Typography>
                      <Typography variant="body2" color="text.secondary" lineHeight={1.8}>{v.desc}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Products Range */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 2 }}>Our Product Range</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            We manufacture and supply a diverse range of premium water purification products:
          </Typography>
          <Grid container spacing={1.5}>
            {products_range.map(p => (
              <Grid key={p} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, borderRadius: 2, '&:hover': { bgcolor: 'rgba(0,119,182,0.04)' } }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', flexShrink: 0 }} />
                  <Typography variant="body2" fontWeight={500}>{p}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Disclaimer */}
        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.200' }}>
          <Typography variant="caption" color="text.secondary" lineHeight={1.8}>
            <strong>Disclaimer:</strong> We operate as a third-party service provider and are independent customer service providers. We are not associated or affiliated with any third-party brands. Our services are provided without using any brand names. References to third-party trademarks, logos, brand names, products, and services are solely for informational purposes.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}