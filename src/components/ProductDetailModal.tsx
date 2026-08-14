import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import type { Product } from '../data/products';

interface Props {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

const badgeSx = (badge: string) => {
  const map: Record<string, { bg: string; color: string }> = {
    'Best Seller': { bg: '#FAC775', color: '#633806' },
    Commercial:   { bg: '#9FE1CB', color: '#085041' },
    Industrial:   { bg: '#F5C4B3', color: '#712B13' },
    Premium:      { bg: '#CECBF6', color: '#26215C' },
    'Eco Pick':   { bg: '#C0DD97', color: '#173404' },
  };
  return map[badge] ?? { bg: '#B5D4F4', color: '#042C53' };
};

export default function ProductDetailModal({ open, onClose, product }: Props) {
  const [activeImg, setActiveImg] = useState(0);

  if (!product) return null;

  const images = product.images ?? [product.image];
  const discount = product.originalPrice > 0
    ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
    : 0;
  const fmt = (p: number) => `₹${p.toLocaleString('en-IN')}`;

  const handleCustomCTA = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/#contact';
      }
    }, 150);
  };

  const technologyValue = product.category === 'Commercial RO' ? 'RO + UV' : 'RO + UV + UF';

  const commercialFlowRate = product.category === 'Commercial RO'
    ? (product.features.find(f => f.includes('LPH Capacity'))?.replace(' Capacity', '') || '25 LPH')
    : '25 LPH';

  const commercialSpecs = [
    { label: 'Technology', value: technologyValue },
    { label: 'Flow Rate',  value: commercialFlowRate },
    { label: 'Power',      value: '25 W' },
    { label: 'Install',    value: 'Wall Mount' },
  ];

  const regularSpecs = [
    { label: 'Technology', value: technologyValue },
    { label: 'Storage',    value: '8–15 L' },
    { label: 'Flow Rate',  value: '15–20 LPH' },
    { label: 'Power',      value: '25 W' },
    { label: 'Install',    value: 'Wall Mount' },
  ];

  const specs = product.category === 'Commercial RO' ? commercialSpecs : regularSpecs;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: { xs: '12px', md: '20px' },
          overflow: 'hidden',
          m: { xs: 1, md: 2 },
          maxHeight: { xs: '95vh', md: '90vh' },
        },
      }}
    >
      {/* Global close button — always visible, above everything */}
      <IconButton
        onClick={onClose}
        size="small"
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 10,
          width: 30,
          height: 30,
          bgcolor: 'rgba(255,255,255,0.92)',
          boxShadow: '0 1px 6px rgba(0,0,0,0.15)',
          '&:hover': { bgcolor: '#fff' },
        }}
      >
        <CloseIcon sx={{ fontSize: 15 }} />
      </IconButton>

      <DialogContent sx={{ p: 0, overflow: { xs: 'auto', md: 'hidden' } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '300px 1fr' },
            minHeight: 0,
          }}
        >
          {/* ── LEFT: Image Panel ── */}
          <Box
            sx={{
              bgcolor: '#EAF3FF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: { xs: '16px 16px 16px', md: '20px 18px 16px' },
              position: 'relative',
              minHeight: { xs: 'auto', md: '100%' },
            }}
          >
            {/* Badges — stay below close button */}
            <Box sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              display: 'flex',
              gap: 0.6,
              flexWrap: 'wrap',
              maxWidth: 'calc(100% - 80px)', // leave room for close btn
              zIndex: 1,
            }}>
              {product.badge && (
                <Box sx={{ ...badgeSx(product.badge), fontSize: '11px', fontWeight: 600, px: 1, py: 0.25, borderRadius: '5px' }}>
                  {product.badge}
                </Box>
              )}
              {!product.isCustomized && discount > 0 && (
                <Box sx={{ bgcolor: '#F7C1C1', color: '#791F1F', fontSize: '11px', fontWeight: 600, px: 1, py: 0.25, borderRadius: '5px', display: 'flex', alignItems: 'center', gap: 0.3 }}>
                  <LocalOfferOutlinedIcon sx={{ fontSize: 11 }} />−{discount}% OFF
                </Box>
              )}
              {product.isNew && (
                <Box sx={{ bgcolor: '#9FE1CB', color: '#085041', fontSize: '11px', fontWeight: 600, px: 1, py: 0.25, borderRadius: '5px' }}>
                  NEW
                </Box>
              )}
            </Box>

            {/* Main image */}
            <Box sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: { xs: 2, md: 3 },
              width: '100%',
              mt: { xs: 4, md: 5 }, // space below badges
            }}>
              <Box
                component="img"
                src={images[activeImg]}
                alt={product.name}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.src = '/product-ro-black.webp'; }}
                sx={{
                  maxWidth: { xs: 160, md: 200 },
                  maxHeight: { xs: 160, md: 210 },
                  objectFit: 'contain',
                  transition: 'opacity 0.2s',
                }}
              />
            </Box>

            {/* Thumbnails */}
            {images.length > 1 && (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center', mb: 1.5 }}>
                {images.map((img, i) => (
                  <Box
                    key={i}
                    onClick={() => setActiveImg(i)}
                    sx={{
                      width: 48, height: 48, borderRadius: 1.5, border: '1.5px solid',
                      borderColor: activeImg === i ? 'primary.main' : 'grey.200',
                      bgcolor: '#fff', overflow: 'hidden', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <Box component="img" src={img} alt="" sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.src = '/product-ro-black.webp'; }}
                    />
                  </Box>
                ))}
              </Box>
            )}

            {/* CTA buttons */}
            <Box sx={{ display: 'flex', gap: 1, width: '100%', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                <Button
                  variant="contained"
                  size="small"
                  component="a"
                  href="tel:+91XXXXXXXXXX"
                  fullWidth
                  startIcon={<PhoneIcon sx={{ fontSize: 14 }} />}
                  sx={{ borderRadius: '10px', fontSize: '0.75rem', py: 1, px:2 }}
                >
                  Call Now
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  component="a"
                  href={`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(`Hi, I'm interested in ${product.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                  startIcon={<WhatsAppIcon sx={{ fontSize: 14 }} />}
                  sx={{
                    borderRadius: '10px', fontSize: '0.75rem', py: 1,
                    borderColor: '#25D366', color: '#128c3e',
                    '&:hover': { bgcolor: '#f0fff5', borderColor: '#128c3e' },
                  }}
                >
                  WhatsApp
                </Button>
              </Box>

              {/* CTA for customized products */}
              {product.isCustomized && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleCustomCTA}
                  fullWidth
                  startIcon={<BuildOutlinedIcon sx={{ fontSize: 14 }} />}
                  sx={{
                    borderRadius: '10px',
                    fontSize: '0.75rem',
                    py: 1,
                    background: 'linear-gradient(135deg, #2d7d32 0%, #43a047 100%)',
                    fontWeight: 700,
                    textTransform: 'none',
                    '&:hover': { background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)' },
                  }}
                >
                  Get Custom Quote
                </Button>
              )}
            </Box>
          </Box>

          {/* ── RIGHT: Details Panel ── */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              p: { xs: '16px', md: '20px 22px' },
              display: 'flex',
              flexDirection: 'column',
              overflow: { md: 'auto' },
              maxHeight: { md: '80vh' },
              pr: { md: '22px' },
            }}
          >
            {/* Top spacer for close button on desktop */}
            <Box sx={{ height: { xs: 0, md: 10 } }} />

            {/* Category + Name */}
            <Typography sx={{ fontSize: '11px', fontWeight: 600, color: 'primary.main', textTransform: 'uppercase', letterSpacing: 0.8, mb: 0.5 }}>
              {product.category}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.25, mb: 0.75, pr: { xs: 4, md: 0 } }}>
              {product.name}
            </Typography>

            {/* Price or CTA */}
            {product.isCustomized ? (
              <Box sx={{ mb: 0.5 }}>
                <Typography sx={{
                  fontSize: '0.8rem', color: '#2d7d32', fontWeight: 600,
                  bgcolor: '#f0fff4', borderRadius: '8px', px: 1.5, py: 0.75,
                  display: 'inline-block',
                }}>
                  ✦ Customised product — contact us for pricing
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.5 }}>
                <Typography sx={{ fontSize: '22px', fontWeight: 800, color: 'primary.dark' }}>
                  {fmt(product.discountedPrice)}
                </Typography>
                <Typography sx={{ fontSize: '13px', color: 'text.disabled', textDecoration: 'line-through' }}>
                  {fmt(product.originalPrice)}
                </Typography>
                {discount > 0 && (
                  <Chip label={`−${discount}% OFF`} size="small" color="error" sx={{ fontSize: '11px', fontWeight: 700, height: 20 }} />
                )}
              </Box>
            )}

            {/* Colors — only if tagged */}
            {product.tags?.includes('multiple colors') && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.25 }}>
                <PaletteOutlinedIcon sx={{ fontSize: 13, color: 'primary.main' }} />
                <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 600 }}>Available in Multiple Colors</Typography>
              </Box>
            )}

            <Box sx={{ height: '0.5px', bgcolor: 'grey.100', mb: 1.25 }} />

            {/* Description */}
            <Typography sx={{ fontSize: '10px', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1, mb: 0.5 }}>
              About this product
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 1.25, fontSize: '12.5px' }}>
              {product.description}
            </Typography>

            {/* Key Features */}
            {product.features.length > 0 && (
              <>
                <Typography sx={{ fontSize: '10px', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1, mb: 0.75 }}>
                  Key Features
                </Typography>
                <Grid container spacing={0.25} sx={{ mb: 1.25 }}>
                  {product.features.map(f => (
                    <Grid key={f} size={{ xs: 12, sm: 6 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, py: 0.4 }}>
                        <CheckCircleIcon sx={{ fontSize: 13, color: 'success.main', flexShrink: 0 }} />
                        <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>{f}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

            {/* Specifications — only for non-custom */}
            {!product.isCustomized && (
              <>
                <Typography sx={{ fontSize: '10px', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1, mb: 0.75 }}>
                  Specifications
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0.75, mb: 1.25 }}>
                  {specs.map(s => (
                    <Box key={s.label} sx={{ bgcolor: 'grey.50', borderRadius: 1.5, px: 1, py: 0.75 }}>
                      <Typography sx={{ fontSize: '10px', color: 'text.secondary', mb: 0.25 }}>{s.label}</Typography>
                      <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>{s.value}</Typography>
                    </Box>
                  ))}
                </Box>
              </>
            )}

            <Box sx={{ height: '0.5px', bgcolor: 'grey.100', mb: 1.25 }} />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}