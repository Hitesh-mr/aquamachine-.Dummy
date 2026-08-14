import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import { Link, useParams, Navigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BoltIcon from '@mui/icons-material/Bolt';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return <Navigate to="/products" replace />;

  const images = product.images ?? [product.image];
  const discount = Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100);
  const formatPrice = (p: number) => `₹${p.toLocaleString('en-IN')}`;
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const whatsappMessage = encodeURIComponent(
    `Hello AQUA MACHINE!

I'm interested in: ${product.name}
Price: ${formatPrice(product.discountedPrice)}
Category: ${product.category}

Please provide more details.`
  );

  const trustItems = [
    { icon: <LocalShippingIcon sx={{ fontSize: 16 }} />, label: 'Free Installation' },
    { icon: <VerifiedIcon sx={{ fontSize: 16 }} />, label: 'Quality Assured' },
    { icon: <SupportAgentIcon sx={{ fontSize: 16 }} />, label: '24×7 Support' },
    { icon: <PhoneIcon sx={{ fontSize: 16 }} />, label: '+91 XXXXX XXXXX' },
  ];

  return (
    <Box sx={{ bgcolor: '#F8FBFF', minHeight: '100vh', pb: { xs: 10, md: 6 } }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>

        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Box
            component={Link}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5, textDecoration: 'none', color: 'inherit' }}
          >
            <HomeIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption">Home</Typography>
          </Box>
          <Box
            component={Link}
            to="/products"
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography variant="caption">Products</Typography>
          </Box>
          <Typography variant="caption" color="text.primary">{product.category}</Typography>
        </Breadcrumbs>

        {/* Main card */}
        <Box
          sx={{
            bgcolor: '#fff',
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'grey.100',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '420px 1fr' },
          }}
        >
          {/* LEFT — Image panel */}
          <Box
            sx={{
              bgcolor: '#F4F7FB',
              borderRight: { md: '1px solid' },
              borderColor: { md: 'grey.100' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              p: { xs: 3, md: 4 },
              position: 'relative',
              minHeight: { xs: 280, md: 480 },
            }}
          >
            {/* Badges top-left */}
            <Box sx={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label={product.category} size="small" color="primary" variant="outlined" sx={{ fontWeight: 600, fontSize: 11 }} />
              {discount > 0 && <Chip label={`−${discount}% OFF`} size="small" color="error" sx={{ fontWeight: 700, fontSize: 11 }} />}
              {product.isNew && <Chip label="NEW" size="small" sx={{ bgcolor: '#00B4D8', color: '#fff', fontWeight: 700, fontSize: 11 }} />}
            </Box>

            {/* Main image */}
            <Box
              component="img"
              src={images[activeImage]}
              alt={product.name}
              sx={{
                width: { xs: 200, md: 260 },
                height: { xs: 180, md: 220 },
                objectFit: 'contain',
                transition: 'opacity 0.2s',
              }}
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.src = '/product-ro-black.webp'; }}
            />

            {/* Thumbnails */}
            {images.length > 1 && (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                {images.map((img, i) => (
                  <Box
                    key={i}
                    onClick={() => setActiveImage(i)}
                    sx={{
                      width: 56, height: 56, borderRadius: 1.5, overflow: 'hidden', cursor: 'pointer',
                      border: '2px solid', borderColor: activeImage === i ? 'primary.main' : 'grey.200',
                      bgcolor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <Box
                      component="img"
                      src={img}
                      alt=""
                      sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.src = '/product-ro-black.webp'; }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          {/* RIGHT — Details panel */}
          <Box sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', gap: 0 }}>

            {/* Product name */}
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, lineHeight: 1.3 }}>
              {product.name}
            </Typography>

            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <Rating value={product.rating} precision={0.5} readOnly size="small" />
              <Typography variant="caption" color="text.secondary">
                {product.rating} ({product.reviews} reviews)
              </Typography>
            </Box>

            {/* Price */}
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.dark' }}>
                {formatPrice(product.discountedPrice)}
              </Typography>
              <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.disabled' }}>
                {formatPrice(product.originalPrice)}
              </Typography>
            </Box>

            {/* Colors */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 2 }}>
              <ColorLensIcon sx={{ fontSize: 15, color: 'primary.main' }} />
              <Typography variant="caption" color="primary.main" fontWeight={500}>
                Available in Multiple Colors
              </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Description */}
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 0.75 }}>
              About this product
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
              {product.description}
            </Typography>

            {/* Key Features */}
            {product.features.length > 0 && (
              <>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 1 }}>
                  Key Features
                </Typography>
                <Grid container spacing={0.75} sx={{ mb: 2 }}>
                  {product.features.map(f => (
                    <Grid key={f} size={{ xs: 12, sm: 6 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <CheckCircleIcon sx={{ fontSize: 15, color: 'success.main', flexShrink: 0 }} />
                        <Typography variant="body2" fontWeight={500}>{f}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

            {/* Specs */}
            {product.specs && (
              <>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 1 }}>
                  Specifications
                </Typography>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <Grid key={key} size={{ xs: 6, sm: 4 }}>
                      <Box sx={{ bgcolor: 'grey.50', borderRadius: 1.5, p: '8px 10px' }}>
                        <Typography variant="caption" color="text.secondary" display="block">{key}</Typography>
                        <Typography variant="body2" fontWeight={600}>{val as string}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

            <Divider sx={{ mb: 2 }} />

            {/* Action buttons */}
            <Box sx={{ display: 'flex', gap: 1.5, mb: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<BoltIcon />}
                component="a"
                href="tel:+91XXXXXXXXXX"
                sx={{ flex: 1, minWidth: 130 }}
              >
                Call Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<WhatsAppIcon />}
                component="a"
                href={`https://wa.me/91XXXXXXXXXX?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ flex: 1, minWidth: 130, borderColor: '#25D366', color: '#25D366', '&:hover': { borderColor: '#1ebe5d', bgcolor: '#f0fff5' } }}
              >
                WhatsApp
              </Button>
            </Box>

            {/* Trust signals */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
              {trustItems.map(item => (
                <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Box sx={{ color: 'primary.main' }}>{item.icon}</Box>
                  <Typography variant="caption" fontWeight={500} color="text.secondary">
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Related Products */}
        {related.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>Related Products</Typography>
            <Grid container spacing={3}>
              {related.map(p => (
                <Grid key={p.id} size={{ xs: 12, sm: 6, md: 3 }}>
                  <ProductCard product={p} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
}
