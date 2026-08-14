import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ budget?: string; phone?: string }>({});

  const validateBudget = (value: string) => {
    if (!value) return ''; // Optional field
    const budgetPattern = /^\d+(\s*[-–]\s*\d+)?$/;
    if (!budgetPattern.test(value)) {
      return 'Enter a valid budget (e.g., 5000 or 5000-10000)';
    }
    return '';
  };

  const validatePhone = (value: string) => {
    if (!value) return 'Phone number is required';
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(value)) {
      return 'Please enter a valid 10-digit phone number';
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const budgetError = validateBudget(form.budget);
    const phoneError = validatePhone(form.phone);
    
    if (phoneError) {
      setErrors({ phone: phoneError });
      return;
    }
    if (budgetError) {
      setErrors({ budget: budgetError });
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello AQUA MACHINE!

Name: ${form.name || 'Your Name'}
Phone: ${form.phone || 'Your Phone'}
${form.budget ? `Budget: ₹${form.budget}` : ''}
${form.message ? `Message: ${form.message}` : ''}`
  );

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
            <Typography variant="caption">Contact</Typography>
          </Breadcrumbs>
          <Typography variant="h3" sx={{ color: '#fff', fontWeight: 800 }}>Contact Us</Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.75)', mt: 1 }}>
            We're here to help. Reach out for service bookings, product enquiries, or any support.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={5}>
          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 2 }}>Get In Touch</Typography>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>We'd Love to Hear From You</Typography>

            {[
              { icon: <PhoneIcon sx={{ fontSize: 28 }} />, title: 'Call Us', content: '+91 XXXXX XXXXX', sub: 'Mon–Sat, 9 AM – 7 PM', href: 'tel:+91XXXXXXXXXX' },
              { icon: <WhatsAppIcon sx={{ fontSize: 28 }} />, title: 'WhatsApp', content: '+91 XXXXX XXXXX', sub: 'Message us anytime', href: `https://wa.me/91XXXXXXXXXX?text=${whatsappMessage}` },
              { icon: <LocationOnIcon sx={{ fontSize: 28 }} />, title: 'Service Area', content: 'Your Service Area', sub: 'All major localities covered', href: undefined },
              { icon: <AccessTimeIcon sx={{ fontSize: 28 }} />, title: 'Working Hours', content: 'Mon – Sat: 9 AM – 7 PM', sub: 'Same-day service available', href: undefined },
            ].map(item => (
              <Paper
                key={item.title}
                elevation={0}
                component={item.href ? 'a' : 'div'}
                href={item.href}
                target={item.href?.startsWith('http') ? '_blank' : undefined}
                rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                sx={{
                  p: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'rgba(0,119,182,0.1)',
                  display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2,
                  textDecoration: 'none', transition: 'all 0.2s',
                  '&:hover': { borderColor: 'primary.main', boxShadow: '0 6px 20px rgba(0,119,182,0.1)', transform: 'translateY(-2px)' },
                }}
              >
                <Box sx={{ width: 50, height: 50, borderRadius: 2, background: 'linear-gradient(135deg, rgba(0,119,182,0.1), rgba(0,180,216,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', flexShrink: 0 }}>
                  {item.icon}
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>{item.title}</Typography>
                  <Typography variant="body1" fontWeight={700} sx={{ color: 'text.primary' }}>{item.content}</Typography>
                  <Typography variant="caption" color="text.secondary">{item.sub}</Typography>
                </Box>
              </Paper>
            ))}
          </Grid>

          {/* Form */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'rgba(0,119,182,0.1)', boxShadow: '0 8px 40px rgba(0,119,182,0.06)', mb: 4 }}>
              {submitted ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                  <Alert severity="success" sx={{ borderRadius: 2, mb: 2 }}>
                    <Typography variant="body1" fontWeight={700}>Message Sent Successfully!</Typography>
                    <Typography variant="body2">We'll get back to you within 2 hours. For urgent service, call us at +91 XXXXX XXXXX.</Typography>
                  </Alert>
                  <Button variant="outlined" onClick={() => setSubmitted(false)}>Send Another Message</Button>
                </Box>
              ) : (
                <Box component="form" onSubmit={handleSubmit}>
                  <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>Send Us a Message</Typography>
                  <Grid container spacing={2.5}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField required fullWidth label="Your Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField 
                        required 
                        fullWidth 
                        label="Phone Number" 
                        value={form.phone} 
                        onChange={e => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setForm(p => ({ ...p, phone: value }));
                          setErrors(p => ({ ...p, phone: validatePhone(value) }));
                        }}
                        error={!!errors.phone}
                        helperText={errors.phone || "Enter 10-digit phone number"}
                        inputProps={{ maxLength: 10 }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth label="Email Address" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      
                        {['Product Enquiry', 'Service Booking', 'Installation', 'AMC Package', 'Commercial RO', 'Other'].map(s => (
                          <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                      
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Your Budget"
                        placeholder="e.g. 5000 – 10000"
                        value={form.budget}
                        onChange={e => {
                          setForm(p => ({ ...p, budget: e.target.value }));
                          setErrors(p => ({ ...p, budget: validateBudget(e.target.value) }));
                        }}
                        error={!!errors.budget}
                        helperText={errors.budget || "Optional — helps us suggest the right product"}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CurrencyRupeeIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField 
                        fullWidth 
                        multiline 
                        rows={6} 
                        label="Message" 
                        value={form.message} 
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))} 
                        inputProps={{ minLength: undefined }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Button type="submit" variant="contained" size="large" fullWidth endIcon={<SendIcon />}>
                            Send Message
                          </Button>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Button
                            variant="outlined"
                            size="large"
                            fullWidth
                            startIcon={<WhatsAppIcon />}
                            href={`https://wa.me/91XXXXXXXXXX?text=${whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            component="a"
                          >
                            Send via WhatsApp
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}