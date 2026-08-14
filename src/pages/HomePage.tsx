import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import PhoneIcon from '@mui/icons-material/Phone';
import VerifiedIcon from '@mui/icons-material/Verified';
import BuildIcon from '@mui/icons-material/Build';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import StarIcon from '@mui/icons-material/Star';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import InputAdornment from '@mui/material/InputAdornment';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import { products, services } from '../data/products';
import type { Product } from '../data/products';

const whyChooseUs = [
  { icon: <VerifiedIcon sx={{ fontSize: 36 }} />, title: 'Quality Assurance', desc: 'High-quality purifiers tested to meet stringent performance and durability standards.' },
  { icon: <SupportAgentIcon sx={{ fontSize: 36 }} />, title: 'Expert Guidance', desc: 'Our team helps you choose the right purifier based on your water source and usage.' },
  { icon: <BuildIcon sx={{ fontSize: 36 }} />, title: 'Pro Installation', desc: 'Certified technicians ensure your purifier is set up correctly for peak performance.' },
  { icon: <SupportAgentIcon sx={{ fontSize: 36 }} />, title: '24x7 Support', desc: 'Our dedicated team is available to help with questions, concerns, or service requests.' },
  { icon: <EmojiEventsIcon sx={{ fontSize: 36 }} />, title: 'Trusted Brand', desc: 'A trusted provider of water purification solutions across your service area.' },
  { icon: <LocalShippingIcon sx={{ fontSize: 36 }} />, title: 'Doorstep Service', desc: 'We come to you. Professional service and installation at your home or business.' },
];

const howItWorks = [
  { step: '01', title: 'Choose Your Purifier', desc: 'Browse our range of All purifiers and select the best fit for your needs and budget.' },
  { step: '02', title: 'Book Installation', desc: 'Call us or submit an enquiry. We schedule a convenient time for professional installation.' },
  // { step: '03', title: 'We Install & Test', desc: 'Our certified technician installs, configures, and thoroughly tests your purifier.' },
  { step: '03', title: 'Enjoy Pure Water', desc: 'Start drinking clean, healthy water. We provide ongoing service and support.' },
];

const testimonials = [
  { name: 'Priya Sharma', location: 'Your City', rating: 5, text: 'Excellent service! The technician arrived on time and installed our RO system perfectly. Water quality is noticeably better. Highly recommend Aqua Machines Solutions!' },
  { name: 'Rajan Mehta', location: 'Your City', rating: 5, text: 'Been using their AMC service for 2 years now. Always prompt, professional, and reasonably priced. The RO water tastes great and the machine runs perfectly.' },
  { name: 'Sunita Patil', location: 'Your City', rating: 5, text: 'Got the Aqua Era model installed last month. Amazing build quality and the forest blue color looks so premium in my kitchen. Service was quick and professional.' },
  { name: 'Amit Desai', location: 'Your City', rating: 4, text: 'Good products at fair prices. The commercial RO plant they installed for my office is working flawlessly. Very happy with the after-sales support.' },
];

const statsData = [
  { value: '1000+', label: 'Happy Customers', icon: <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} /> },
  { value: 'All', label: 'Products Range', icon: <InventoryIcon sx={{ fontSize: 40, color: 'primary.main' }} /> },
  { value: '11+', label: 'Years Experience', icon: <WorkspacePremiumIcon sx={{ fontSize: 40, color: 'primary.main' }} /> },
  { value: '98%', label: 'Satisfaction Rate', icon: <StarIcon sx={{ fontSize: 40, color: 'primary.main' }} /> },
];

const allServices = [...services];

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'discount', label: 'Highest Discount' },
];

const categoryOptions = ['All', 'Domestic RO', 'Commercial RO', 'UV Water Purifier', 'Small Commercial / Water Dispenser RO', 'Customized Product'];

export default function HomePage() {
  const [productDetailOpen, setProductDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogSort, setCatalogSort] = useState('default');
  const [catalogCategory, setCatalogCategory] = useState('All');
  const [catalogPrice, setCatalogPrice] = useState('all');

  const [contactForm, setContactForm] = useState({ name: '', phone: '', budget: '', area: '' });
  const [formErrors, setFormErrors] = useState({ name: '', phone: '', area: '' });

  const activeFilterCount = [
    catalogSort !== 'default',
    catalogCategory !== 'All',
    catalogPrice !== 'all',
  ].filter(Boolean).length;

  const handleResetFilters = () => {
    setCatalogSort('default');
    setCatalogCategory('All');
    setCatalogPrice('all');
  };

  const filteredCatalog = (() => {
    let result = [...products];
    if (catalogCategory !== 'All') result = result.filter(p => p.category === catalogCategory);
    if (catalogSearch.trim()) {
      const q = catalogSearch.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (catalogPrice === 'under10000') result = result.filter(p => p.discountedPrice < 10000);
    else if (catalogPrice === '10000-20000') result = result.filter(p => p.discountedPrice >= 10000 && p.discountedPrice < 20000);
    else if (catalogPrice === '20000-50000') result = result.filter(p => p.discountedPrice >= 20000 && p.discountedPrice < 50000);
    else if (catalogPrice === 'above50000') result = result.filter(p => p.discountedPrice >= 50000);
    switch (catalogSort) {
      case 'price-low': result.sort((a, b) => a.discountedPrice - b.discountedPrice); break;
      case 'price-high': result.sort((a, b) => b.discountedPrice - a.discountedPrice); break;
      case 'discount': result.sort((a, b) => (b.originalPrice - b.discountedPrice) / b.originalPrice - (a.originalPrice - a.discountedPrice) / a.originalPrice); break;
    }
    return result;
  })();

  const validateForm = () => {
    const errors = { name: '', phone: '', area: '' };
    let isValid = true;

    // Name validation
    if (!contactForm.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    } else if (contactForm.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(contactForm.name.trim())) {
      errors.name = 'Name should only contain letters';
      isValid = false;
    }

    // Phone validation
    if (!contactForm.phone.trim()) {
      errors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(contactForm.phone.trim())) {
      errors.phone = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }

    // Message validation — only check if not empty (no minimum length)
    if (!contactForm.area.trim()) {
      errors.area = 'Message is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const sanitizeInput = (input: string) => {
    return input
      .trim()
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Sanitize inputs for security
    const sanitizedName = sanitizeInput(contactForm.name);
    const sanitizedPhone = sanitizeInput(contactForm.phone);
    const sanitizedBudget = contactForm.budget ? sanitizeInput(contactForm.budget) : 'Not specified';
    const sanitizedMessage = sanitizeInput(contactForm.area);

    const message = `Hi, my name is ${sanitizedName}. Phone: ${sanitizedPhone}. Budget: ${sanitizedBudget}. Message: ${sanitizedMessage}`;
    const whatsappUrl = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Clear form after submission
    setContactForm({ name: '', phone: '', budget: '', area: '' });
    setFormErrors({ name: '', phone: '', area: '' });
  };

  return (
    <Box sx={{ pb: { xs: 8, md: 0 } }}>

      {/* ===== HERO SECTION ===== */}
      <Box
        id="hero"
        sx={{
          background: 'linear-gradient(135deg, #023E8A 0%, #0077B6 60%, #00B4D8 100%)',
          minHeight: { xs: '90vh', md: '88vh' },
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: -150, left: -50, width: 400, height: 400, borderRadius: '50%', background: 'rgba(0,180,216,0.08)', pointerEvents: 'none' }} />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Chip label="Trusted Provider · Your Service Area" sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#90E0EF', mb: 3, fontWeight: 600, backdropFilter: 'blur(10px)', border: '1px solid rgba(144,224,239,0.3)' }} />
              <Typography variant="h1" sx={{ color: '#fff', fontSize: { xs: '2.5rem', sm: '3rem', md: '3.8rem' }, lineHeight: 1.15, mb: 2, fontWeight: 800 }}>
                Pure Water.
                <br />
                <Box component="span" sx={{ background: 'linear-gradient(90deg, #90E0EF, #CAF0F8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Pure Life.
                </Box>
              </Typography>
              <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.85)', mb: 2, fontWeight: 400, lineHeight: 1.5, fontSize: { xs: '1rem', md: '1.2rem' } }}>
                Premium RO Water Purifiers for Your Home & Business
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4, lineHeight: 1.8, maxWidth: 480 }}>
                Advanced multi-stage filtration delivering clean, healthy, mineral-rich water. All products, expert installation, and ongoing service across your service area.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 5 }}>
                <Button variant="contained" size="large" onClick={() => { document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }} endIcon={<ArrowForwardIcon />} sx={{ bgcolor: '#fff', color: 'primary.dark', '&:hover': { bgcolor: '#CAF0F8', boxShadow: '0 8px 25px rgba(255,255,255,0.3)' } }}>
                  Explore Products
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                {['1000+ Happy Customers', '11+ Years Experience', 'Same Day Service'].map(badge => (
                  <Box key={badge} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <CheckCircleIcon sx={{ fontSize: 16, color: '#90E0EF' }} />
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{badge}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
              <Box sx={{ position: 'relative', width: '100%', maxWidth: 620, height: 540, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{
                  position: 'absolute', top: '50%', left: '50%', width: 520, height: 520, transform: 'translate(-50%, -50%)',
                  borderRadius: '50%', border: '1.5px solid rgba(144,224,239,0.18)',
                  animation: 'heroRingRotate 22s linear infinite', pointerEvents: 'none',
                  '@keyframes heroRingRotate': { '0%': { transform: 'translate(-50%,-50%) rotate(0deg)' }, '100%': { transform: 'translate(-50%,-50%) rotate(360deg)' } },
                  '&::before': { content: '""', position: 'absolute', inset: 20, borderRadius: '50%', border: '1px dashed rgba(144,224,239,0.1)' },
                  '&::after': { content: '""', position: 'absolute', inset: 55, borderRadius: '50%', border: '1px solid rgba(144,224,239,0.06)' },
                }} />
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', width: 380, height: 380, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,180,255,0.18) 0%, rgba(0,100,200,0.12) 50%, transparent 75%)', filter: 'blur(24px)', pointerEvents: 'none' }} />
                <Box component="img" src="/heroimage.png" alt="AquaSoft RO Water Purifier" sx={{ width: 500, height: 460, objectFit: 'contain', position: 'relative', zIndex: 2, filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.45)) drop-shadow(0 0 80px rgba(0,150,255,0.25))', display: 'block' }} />
                <Paper elevation={0} sx={{ position: 'absolute', top: '6%', right: -10, zIndex: 20, bgcolor: 'rgba(255,255,255,0.97)', borderRadius: '18px', p: '12px 18px 12px 12px', display: 'flex', alignItems: 'center', gap: 1.5, boxShadow: '0 12px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,100,200,0.12)', minWidth: 160, border: '1px solid rgba(144,224,239,0.3)', animation: 'floatUp 3s ease-in-out infinite', '@keyframes floatUp': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } } }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: '14px', flexShrink: 0, background: 'linear-gradient(135deg, #0077B6, #00B4D8)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0,119,182,0.4)' }}>
                    <WaterDropIcon sx={{ color: '#fff', fontSize: 22 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 800, color: '#012d6b', fontSize: '0.88rem', lineHeight: 1.2 }}>7-Stage</Typography>
                    <Typography sx={{ color: '#6b7a94', fontSize: '0.7rem', fontWeight: 500 }}>Purification</Typography>
                  </Box>
                </Paper>
                <Box sx={{ position: 'absolute', top: '48%', right: -20, zIndex: 20, background: 'linear-gradient(135deg, #012d6b, #0077B6)', borderRadius: '50px', p: '8px 16px', display: 'flex', alignItems: 'center', gap: 1, boxShadow: '0 8px 28px rgba(0,0,0,0.25)', animation: 'floatMid 4s ease-in-out infinite', '@keyframes floatMid': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-5px)' } } }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4ade80', boxShadow: '0 0 8px #4ade80', animation: 'pulseDot 1.5s ease-in-out infinite', '@keyframes pulseDot': { '0%,100%': { opacity: 1, transform: 'scale(1)' }, '50%': { opacity: 0.5, transform: 'scale(0.7)' } } }} />
                  <Typography sx={{ color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>Service Active</Typography>
                </Box>
                <Paper elevation={0} sx={{ position: 'absolute', bottom: '6%', left: -10, zIndex: 20, bgcolor: 'rgba(255,255,255,0.97)', borderRadius: '18px', p: '12px 18px 12px 12px', display: 'flex', alignItems: 'center', gap: 1.5, boxShadow: '0 12px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(255,107,0,0.12)', minWidth: 170, border: '1px solid rgba(255,107,0,0.15)', animation: 'floatDown 3.5s ease-in-out infinite', '@keyframes floatDown': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(8px)' } } }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: '14px', flexShrink: 0, background: 'linear-gradient(135deg, #FF6B00, #FF9A3C)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(255,107,0,0.4)' }}>
                    <StarIcon sx={{ color: '#fff', fontSize: 22 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 800, color: '#1a1a1a', fontSize: '0.88rem', lineHeight: 1.2 }}>4.8★ Rated</Typography>
                    <Typography sx={{ color: '#FF6B00', fontSize: '0.65rem', letterSpacing: 1 }}>★★★★★</Typography>
                    <Typography sx={{ color: '#6b7a94', fontSize: '0.7rem', fontWeight: 500 }}>1000+ Reviews</Typography>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ===== STATS ===== */}
      <Box sx={{ background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)', py: 6 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3} justifyContent="center">
            {statsData.map(stat => (
              <Grid key={stat.label} size={{ xs: 6, md: 3 }}>
                <Box sx={{ textAlign: 'center', p: 3 }}>
                  <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>{stat.icon}</Box>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.dark', mb: 0.5 }}>{stat.value}</Typography>
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>{stat.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ===== WHY CHOOSE US ===== */}
      <Box sx={{ py: { xs: 6, md: 8 }, background: 'linear-gradient(180deg, #fff 0%, #F0F9FF 100%)' }}>
        <Container maxWidth="xl">
          <Grid container spacing={5} alignItems="center">
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 2 }}>Why Aqua Machines Solutions</Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>We Just Make Water Purification Better For You</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
                Aqua Machines Solutions has built a robust reputation as the leading water purification company in your service area. We offer comprehensive services at affordable costs, ensuring you get the best value.
              </Typography>
              {['1000+ Satisfied Customers', 'Certified Installation Technicians', 'Same-Day Service Available', 'Free Post-Service Support'].map(item => (
                <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Typography variant="body2" fontWeight={500}>{item}</Typography>
                </Box>
              ))}
              <Button variant="contained" size="large" sx={{ mt: 3 }} onClick={() => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Learn More About Us
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Grid container spacing={2.5}>
                {whyChooseUs.map(item => (
                  <Grid key={item.title} size={{ xs: 12, sm: 6 }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'rgba(0,119,182,0.1)', transition: 'all 0.3s', '&:hover': { borderColor: 'primary.main', boxShadow: '0 8px 30px rgba(0,119,182,0.1)', transform: 'translateY(-3px)' } }}>
                      <Box sx={{ color: 'primary.main', mb: 1.5 }}>{item.icon}</Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '0.95rem' }}>{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{item.desc}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ===== HOW IT WORKS ===== */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: '#F8FBFF' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 2 }}>Process</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800 }}>How It Works</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 450, mx: 'auto' }}>
              Get pure water in 3 simple steps. From selection to installation in record time.
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {howItWorks.map((step, i) => (
              <Grid key={step.step} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ textAlign: 'center', position: 'relative' }}>
                  {i < howItWorks.length - 1 && (
                    <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', top: 28, left: '60%', right: '-40%', height: 2, background: 'linear-gradient(90deg, #0077B6, rgba(0,119,182,0.1))', zIndex: 0 }} />
                  )}
                  <Box sx={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #0077B6, #00B4D8)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3, position: 'relative', zIndex: 1, boxShadow: '0 8px 25px rgba(0,119,182,0.3)' }}>
                    <Typography variant="h5" sx={{ color: '#fff', fontWeight: 800 }}>{step.step}</Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{step.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{step.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ===== PRODUCTS SECTION ===== */}
      <Box id="products" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#F8FBFF' }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 2 }}>All Products</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5 }}>Complete Product Catalog</Typography>
            <Typography variant="body1" color="text.secondary">Premium water purifiers for every home and business need</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search products..."
              value={catalogSearch}
              onChange={(e) => setCatalogSearch(e.target.value)}
              size="small"
              sx={{ width: { xs: '100%', sm: 260 }, '& .MuiOutlinedInput-root': { borderRadius: '8px', bgcolor: '#fff' } }}
              InputProps={{
                startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: 'text.secondary', fontSize: 18 }} /></InputAdornment>),
                ...(catalogSearch && { endAdornment: (<InputAdornment position="end"><Box onClick={() => setCatalogSearch('')} sx={{ cursor: 'pointer', display: 'flex', color: 'text.secondary', '&:hover': { color: 'text.primary' } }}><CloseIcon sx={{ fontSize: 15 }} /></Box></InputAdornment>) })
              }}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Category</InputLabel>
              <Select value={catalogCategory} label="Category" onChange={(e) => setCatalogCategory(e.target.value)} sx={{ borderRadius: '8px', bgcolor: '#fff' }}>
                {categoryOptions.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 170 }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={catalogSort} label="Sort By" onChange={(e) => setCatalogSort(e.target.value)} sx={{ borderRadius: '8px', bgcolor: '#fff' }}>
                {sortOptions.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
              </Select>
            </FormControl>
            {activeFilterCount > 0 && (
              <Button size="small" onClick={handleResetFilters} startIcon={<CloseIcon sx={{ fontSize: 14 }} />} sx={{ color: 'text.secondary', textTransform: 'none', fontWeight: 500, fontSize: '0.78rem', '&:hover': { color: 'error.main' } }}>
                Clear
              </Button>
            )}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Showing <strong>{filteredCatalog.length}</strong> of <strong>{products.length}</strong> products
          </Typography>
          <Grid container spacing={3}>
            {filteredCatalog.map(product => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <ProductCard product={product} onEnquire={(product) => { setSelectedProduct(product); setProductDetailOpen(true); }} />
              </Grid>
            ))}
          </Grid>
          {filteredCatalog.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" color="text.secondary">No products found</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>Try adjusting your search or filters</Typography>
              <Button variant="outlined" onClick={() => { setCatalogSearch(''); handleResetFilters(); }}>Clear All Filters</Button>
            </Box>
          )}
        </Container>
      </Box>

      {/* ===== TESTIMONIALS ===== */}
      <Box sx={{ py: { xs: 6, md: 8 }, background: 'linear-gradient(180deg, #F0F9FF 0%, #fff 100%)' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 2 }}>Testimonials</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800 }}>What Our Customers Say</Typography>
          </Box>
          <Grid container spacing={3}>
            {testimonials.map(t => {
              const initials = t.name.split(' ').map(n => n[0]).join('').toUpperCase();
              return (
                <Grid key={t.name} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card sx={{ p: 0.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ width: 50, height: 50, borderRadius: '50%', bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, flexShrink: 0, color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{initials}</Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.5, fontStyle: 'italic' }}>"{t.text}"</Typography>
                      <Box sx={{ mt: 'auto' }}>
                        <Typography variant="body2" fontWeight={700} sx={{ mb: 0.5, lineHeight: 1.3 }}>{t.name}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.3 }}>{t.location}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* ===== SERVICES SECTION ===== */}
      <Box id="services" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#fff' }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 2 }}>Services</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5 }}>Our Services</Typography>
            <Typography variant="body1" color="text.secondary">Expert RO service & installation starting at just ₹149. Certified technicians across your service area.</Typography>
          </Box>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {allServices.slice(0, 3).map(service => {
              const discount = Math.round(((service.originalPrice - service.discountedPrice) / service.originalPrice) * 100);
              return (
                <Grid key={service.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, overflow: 'hidden', transition: 'all 0.3s', '&:hover': { boxShadow: '0 12px 40px rgba(0,119,182,0.15)', transform: 'translateY(-4px)' } }}>
                    <Box sx={{ position: 'relative', overflow: 'hidden', height: 210, bgcolor: '#f0f7ff', flexShrink: 0 }}>
                      <Box component="img" src={service.image} alt={service.name} sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform 0.4s ease', '&:hover': { transform: 'scale(1.05)' } }} />
                      {discount > 0 && <Chip label={`${discount}% OFF`} size="small" color="error" sx={{ position: 'absolute', top: 12, right: 12, fontWeight: 700, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }} />}
                    </Box>
                    <CardContent sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" fontWeight={700} sx={{ mb: 1, fontSize: '1rem' }}>{service.name}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 1.5 }}>
                        <Typography variant="h5" fontWeight={800} color="primary.dark">₹{service.discountedPrice.toLocaleString('en-IN')}</Typography>
                        <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>₹{service.originalPrice.toLocaleString('en-IN')}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.7 }}>{service.description}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        <AccessTimeIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                        <Typography variant="caption" fontWeight={600}>{service.duration}</Typography>
                      </Box>
                      <Typography variant="caption" fontWeight={700} sx={{ mb: 1, display: 'block', color: 'text.primary' }}>Includes:</Typography>
                      <Box sx={{ flex: 1 }}>
                        {service.includes.map(inc => (
                          <Box key={inc} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <CheckCircleIcon sx={{ fontSize: 14, color: 'primary.main', flexShrink: 0 }} />
                            <Typography variant="caption">{inc}</Typography>
                          </Box>
                        ))}
                      </Box>
                      <Button fullWidth variant="contained" sx={{ mt: 2.5 }} component="a" href="tel:+91XXXXXXXXXX">Call: +91 XXXXX XXXXX</Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <Grid container spacing={3} justifyContent="center" sx={{ mb: 6 }}>
            {allServices.slice(3).map(service => {
              const discount = Math.round(((service.originalPrice - service.discountedPrice) / service.originalPrice) * 100);
              return (
                <Grid key={service.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, overflow: 'hidden', transition: 'all 0.3s', '&:hover': { boxShadow: '0 12px 40px rgba(0,119,182,0.15)', transform: 'translateY(-4px)' } }}>
                    <Box sx={{ position: 'relative', overflow: 'hidden', height: 210, bgcolor: '#f0f7ff', flexShrink: 0 }}>
                      <Box component="img" src={service.image} alt={service.name} sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform 0.4s ease', '&:hover': { transform: 'scale(1.05)' } }} onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.objectFit = 'contain'; e.currentTarget.style.padding = '16px'; }} />
                      {discount > 0 && <Chip label={`${discount}% OFF`} size="small" color="error" sx={{ position: 'absolute', top: 12, right: 12, fontWeight: 700, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }} />}
                    </Box>
                    <CardContent sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" fontWeight={700} sx={{ mb: 1, fontSize: '1rem' }}>{service.name}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 1.5 }}>
                        <Typography variant="h5" fontWeight={800} color="primary.dark">₹{service.discountedPrice.toLocaleString('en-IN')}</Typography>
                        <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>₹{service.originalPrice.toLocaleString('en-IN')}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.7 }}>{service.description}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        <AccessTimeIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                        <Typography variant="caption" fontWeight={600}>{service.duration}</Typography>
                      </Box>
                      <Typography variant="caption" fontWeight={700} sx={{ mb: 1, display: 'block', color: 'text.primary' }}>Includes:</Typography>
                      <Box sx={{ flex: 1 }}>
                        {service.includes.map(inc => (
                          <Box key={inc} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <CheckCircleIcon sx={{ fontSize: 14, color: 'primary.main', flexShrink: 0 }} />
                            <Typography variant="caption">{inc}</Typography>
                          </Box>
                        ))}
                      </Box>
                      <Button fullWidth variant="contained" sx={{ mt: 2.5 }} component="a" href="tel:+91XXXXXXXXXX">Call: +91 XXXXX XXXXX</Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* ===== ABOUT SECTION ===== */}
      <Box id="about" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#F8FBFF' }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 2 }}>About Us</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5 }}>About Aqua Machines Solutions</Typography>
            <Typography variant="body1" color="text.secondary">Your trusted water purification partner</Typography>
          </Box>
          <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.9 }}>Welcome to Aqua Machines Water Purifier — your gateway to pristine, delicious water, effortlessly delivered right to your home!</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.9 }}>Aqua Machines Solutions has built a robust reputation as a leading water purification company in your service area. We specialize in water filter supplies and comprehensive water purification services at affordable cost, ensuring you save both time and money.</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.9 }}>As a one-stop solution for all your water purifier service needs, we cater to a wide range of RO, UV, and other purification systems. Trust us for expert installation, servicing, and maintenance, ensuring your access to clean, pure, and safe water, always.</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box component="img" src="/family-drinking-water.webp" alt="Aqua Machines Solutions team" sx={{ width: '100%', borderRadius: 4, boxShadow: '0 20px 60px rgba(0,119,182,0.15)', display: 'block' }} onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.src = '/placeholder-image.jpg'; }} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ===== CONTACT SECTION ===== */}
      <Box id="contact" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#fff' }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 2 }}>Contact</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5 }}>Contact Us</Typography>
            <Typography variant="body1" color="text.secondary">We're here to help. Reach out for service bookings, product enquiries, or any support.</Typography>
          </Box>
          <Grid container spacing={5}>
            <Grid size={{ xs: 12, md: 4 }}>
              {[
                { icon: <PhoneIcon sx={{ fontSize: 28 }} />, title: 'Call Us', content: '+91 XXXXX XXXXX', sub: 'Mon–Sun, 9 AM – 7 PM', href: 'tel:+91XXXXXXXXXX' },
                { icon: <WhatsAppIcon sx={{ fontSize: 28 }} />, title: 'WhatsApp', content: '+91 XXXXX XXXXX', sub: 'Message us anytime', href: 'https://wa.me/91XXXXXXXXXX' },
                { icon: <LocationOnIcon sx={{ fontSize: 28 }} />, title: 'Service Area', content: 'Your Service Area', sub: 'All major localities covered', href: undefined },
              ].map(item => (
                <Paper key={item.title} elevation={0} component={item.href ? 'a' : 'div'} href={item.href} target={item.href?.startsWith('http') ? '_blank' : undefined} rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined} sx={{ p: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'rgba(0,119,182,0.1)', display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2, textDecoration: 'none', transition: 'all 0.2s', '&:hover': { borderColor: 'primary.main', boxShadow: '0 6px 20px rgba(0,119,182,0.1)', transform: 'translateY(-2px)' } }}>
                  <Box sx={{ width: 50, height: 50, borderRadius: 2, background: 'linear-gradient(135deg, rgba(0,119,182,0.1), rgba(0,180,216,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', flexShrink: 0 }}>{item.icon}</Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>{item.title}</Typography>
                    <Typography variant="body1" fontWeight={700} sx={{ color: 'text.primary' }}>{item.content}</Typography>
                    <Typography variant="caption" color="text.secondary">{item.sub}</Typography>
                  </Box>
                </Paper>
              ))}
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'rgba(0,119,182,0.1)', boxShadow: '0 8px 40px rgba(0,119,182,0.06)', mb: 4 }}>
                <Box component="form" onSubmit={handleContactSubmit}>
                  <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>Send Us a Message</Typography>
                  <Grid container spacing={2.5}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField 
                        required 
                        fullWidth 
                        label="Your Name" 
                        value={contactForm.name} 
                        onChange={e => {
                          setContactForm(p => ({ ...p, name: e.target.value }));
                          if (formErrors.name) setFormErrors(p => ({ ...p, name: '' }));
                        }}
                        error={!!formErrors.name}
                        helperText={formErrors.name}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField 
                        required 
                        fullWidth 
                        label="Phone Number" 
                        value={contactForm.phone} 
                        onChange={e => {
                          setContactForm(p => ({ ...p, phone: e.target.value }));
                          if (formErrors.phone) setFormErrors(p => ({ ...p, phone: '' }));
                        }}
                        error={!!formErrors.phone}
                        helperText={formErrors.phone}
                        inputProps={{ maxLength: 10 }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Your Budget"
                        placeholder="e.g. 5000 – 10000"
                        value={contactForm.budget}
                        onChange={e => setContactForm(p => ({ ...p, budget: e.target.value }))}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CurrencyRupeeIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                            </InputAdornment>
                          ),
                        }}
                        helperText="Optional — helps us suggest the right product"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Box sx={{ display: { xs: 'none', sm: 'block' } }} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField 
                        required 
                        fullWidth 
                        multiline 
                        rows={4} 
                        label="Message" 
                        value={contactForm.area} 
                        onChange={e => {
                          setContactForm(p => ({ ...p, area: e.target.value }));
                          if (formErrors.area) setFormErrors(p => ({ ...p, area: '' }));
                        }}
                        error={!!formErrors.area}
                        helperText={formErrors.area}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Button type="submit" variant="contained" size="large" fullWidth endIcon={<ArrowForwardIcon />}>Send Message</Button>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <ProductDetailModal open={productDetailOpen} onClose={() => setProductDetailOpen(false)} product={selectedProduct} />
    </Box>
  );
}
