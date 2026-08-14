import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PhoneIcon from '@mui/icons-material/Phone';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import type { Product } from '../data/products';

interface Props {
  product: Product;
  onEnquire?: (product: Product) => void;
}

const badgeColor = (badge: string) =>
  badge === 'Best Seller' ? '#E85D04'
  : badge === 'Commercial' ? '#2d6a4f'
  : badge === 'Industrial' ? '#6d3a0f'
  : badge === 'Premium' ? '#7B2FBE'
  : badge === 'Eco Pick' ? '#2d7d32'
  : '#0077B6';

export default function ProductCard({ product, onEnquire }: Props) {
  const discount = product.originalPrice > 0
    ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
    : 0;
  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

  const handleCustomCTA = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact';
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
        border: '1px solid #eaf1f8',
        boxShadow: '0 2px 16px rgba(0,60,120,0.07)',
        transition: 'all 0.28s cubic-bezier(.4,0,.2,1)',
        bgcolor: '#fff',
        '&:hover': {
          boxShadow: '0 10px 36px rgba(0,100,180,0.14)',
          borderColor: '#b3d4ee',
          transform: 'translateY(-4px)',
        },
      }}
    >
      {/* ── Image zone ── */}
      <Box sx={{ position: 'relative', bgcolor: '#fff', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            height: 380,
            objectFit: 'contain',
            p: 3,
            transition: 'transform 0.4s ease',
            '&:hover': { transform: 'scale(1.06)' },
          }}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.src = '/product-ro-black.webp'; }}
        />

        {/* Badge top-left */}
        <Box sx={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {product.badge && (
            <Box sx={{
              bgcolor: badgeColor(product.badge), color: '#fff',
              fontSize: '0.6rem', fontWeight: 800, px: 1, py: 0.3,
              borderRadius: '6px', letterSpacing: 0.3, lineHeight: 1.6,
            }}>
              {product.badge.toUpperCase()}
            </Box>
          )}
          {product.isNew && (
            <Box sx={{
              bgcolor: '#00B4D8', color: '#fff',
              fontSize: '0.6rem', fontWeight: 800, px: 1, py: 0.3,
              borderRadius: '6px', letterSpacing: 0.3, lineHeight: 1.6,
            }}>
              NEW
            </Box>
          )}
        </Box>

        {/* Discount top-right — only for non-custom */}
        {!product.isCustomized && discount > 0 && (
          <Box sx={{
            position: 'absolute', top: 10, right: 10,
            bgcolor: '#e63946', color: '#fff',
            fontSize: '0.65rem', fontWeight: 800, px: 1, py: 0.3,
            borderRadius: '6px', letterSpacing: 0.2, lineHeight: 1.6,
          }}>
            -{discount}%
          </Box>
        )}
      </Box>

      {/* ── Content ── */}
      <CardContent sx={{ flex: 1, px: 2.5, pt: 2, pb: 1.5, bgcolor: '#f8fafc' }}>
        {/* Category pill */}
        <Typography sx={{
          display: 'inline-block',
          fontSize: '0.6rem', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: 1,
          color: '#0077B6', bgcolor: '#e8f4fc',
          borderRadius: '4px', px: 0.8, py: 0.25, mb: 1,
        }}>
          {product.category}
        </Typography>

        {/* Name */}
        <Typography sx={{
          fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.35,
          color: '#0d1b2a', mb: 1.2,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {product.name}
        </Typography>

        {/* Colors tag — only if tagged */}
        {product.tags?.includes('multiple colors') && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mb: 1.5 }}>
            <PaletteOutlinedIcon sx={{ fontSize: 12, color: '#5c9eca' }} />
            <Typography sx={{ fontSize: '0.67rem', color: '#5c9eca', fontWeight: 600 }}>
              Available in Multiple Colors
            </Typography>
          </Box>
        )}

        {/* Commercial + Industrial suitable line - only for customized-model-2 */}
        {product.id === 'customized-model-2' && (
          <Typography sx={{
            fontSize: '0.7rem', color: '#2d6a4f', fontWeight: 600,
            bgcolor: '#f0fff4', borderRadius: '6px', px: 1, py: 0.4,
            display: 'inline-block', mb: 1.5,
          }}>
            ✦ Commercial + Industrial Best Suitable for office, school, hotel, hospital & college
          </Typography>
        )}

        {/* Price — hide for customized products */}
        {!product.isCustomized && (
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <Typography sx={{ fontWeight: 800, color: '#023E8A', fontSize: '1.2rem', lineHeight: 1 }}>
              {formatPrice(product.discountedPrice)}
            </Typography>
            <Typography sx={{ textDecoration: 'line-through', color: '#aab8c5', fontSize: '0.78rem' }}>
              {formatPrice(product.originalPrice)}
            </Typography>
          </Box>
        )}

        {/* Custom product tagline */}
        {product.isCustomized && product.id !== 'customized-model-2' && (
          <Typography sx={{
            fontSize: '0.72rem', color: '#2d7d32', fontWeight: 600,
            bgcolor: '#f0fff4', borderRadius: '6px', px: 1, py: 0.4,
            display: 'inline-block',
          }}>
            ✦ Customised product available — get a quote!
          </Typography>
        )}
      </CardContent>

      {/* ── Action Row ── */}
      <Box sx={{ px: 2.5, pb: 2.5, pt: 0.5, display: 'flex', gap: 1.5 }}>
        {product.isCustomized ? (
          /* Custom products: Call + Get Custom Quote CTA */
          <>
            <Button
              variant="outlined"
              component="a"
              href="tel:+91XXXXXXXXXX"
              sx={{
                flex: 1,
                minWidth: 0,
                fontSize: '0.73rem',
                fontWeight: 700,
                borderColor: '#0077B6',
                color: '#0077B6',
                borderRadius: '10px',
                py: 0.85,
                whiteSpace: 'nowrap',
                gap: 0.6,
                '&:hover': { bgcolor: '#0077B6', color: '#fff', borderColor: '#0077B6' },
                transition: 'all 0.22s ease',
              }}
            >
              <PhoneIcon sx={{ fontSize: 14 }} />
              Call
            </Button>
            <Button
              variant="contained"
              onClick={handleCustomCTA}
              sx={{
                flex: 1.6,
                minWidth: 0,
                fontSize: '0.73rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #2d7d32 0%, #43a047 100%)',
                borderRadius: '10px',
                py: 0.85,
                whiteSpace: 'nowrap',
                gap: 0.6,
                boxShadow: '0 3px 12px rgba(45,125,50,0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
                  boxShadow: '0 6px 18px rgba(45,125,50,0.4)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.22s ease',
              }}
            >
              <BuildOutlinedIcon sx={{ fontSize: 14 }} />
              Get Custom Quote
            </Button>
          </>
        ) : (
          /* Regular products: Call + More Details */
          <>
            <Button
              variant="outlined"
              component="a"
              href="tel:+91XXXXXXXXXX"
              sx={{
                flex: 1,
                minWidth: 0,
                fontSize: '0.73rem',
                fontWeight: 700,
                borderColor: '#0077B6',
                color: '#0077B6',
                borderRadius: '10px',
                py: 0.85,
                whiteSpace: 'nowrap',
                gap: 0.6,
                '&:hover': { bgcolor: '#0077B6', color: '#fff', borderColor: '#0077B6' },
                transition: 'all 0.22s ease',
              }}
            >
              <PhoneIcon sx={{ fontSize: 14 }} />
              Call
            </Button>
            <Button
              variant="contained"
              onClick={() => onEnquire?.(product)}
              sx={{
                flex: 1.6,
                minWidth: 0,
                fontSize: '0.73rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)',
                borderRadius: '10px',
                py: 0.85,
                whiteSpace: 'nowrap',
                gap: 0.6,
                boxShadow: '0 3px 12px rgba(0,119,182,0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #005f91 0%, #009bb8 100%)',
                  boxShadow: '0 6px 18px rgba(0,119,182,0.4)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.22s ease',
              }}
            >
              <InfoOutlinedIcon sx={{ fontSize: 14 }} />
              More Details
            </Button>
          </>
        )}
      </Box>
    </Card>
  );
}