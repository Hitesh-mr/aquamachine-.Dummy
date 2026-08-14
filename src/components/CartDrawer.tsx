import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCart } from '../context/CartContext';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: '100vw', sm: 420 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, #023E8A 0%, #0077B6 100%)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShoppingCartOutlinedIcon sx={{ color: '#fff' }} />
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
              Cart ({totalItems})
            </Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Items */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          {items.length === 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 2 }}>
              <ShoppingCartOutlinedIcon sx={{ fontSize: 80, color: 'text.disabled' }} />
              <Typography variant="h6" color="text.secondary">Your cart is empty</Typography>
              <Button variant="contained" onClick={onClose}>Continue Shopping</Button>
            </Box>
          ) : (
            <Stack spacing={2}>
              {items.map(({ product, quantity }) => (
                <Box key={product.id} sx={{ display: 'flex', gap: 2, p: 2, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.100' }}>
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{ width: 80, height: 80, objectFit: 'contain', borderRadius: 1, bgcolor: '#fff' }}
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.src = '/product-ro-black.webp'; }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 700 }}>
                      {formatPrice(product.discountedPrice)}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'grey.300', borderRadius: 1 }}>
                        <IconButton size="small" onClick={() => updateQuantity(product.id, quantity - 1)} sx={{ p: 0.5 }}>
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="body2" sx={{ px: 1.5, fontWeight: 600 }}>{quantity}</Typography>
                        <IconButton size="small" onClick={() => updateQuantity(product.id, quantity + 1)} sx={{ p: 0.5 }}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <IconButton size="small" onClick={() => removeFromCart(product.id)} sx={{ color: 'error.main' }}>
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>
          )}
        </Box>

        {/* Footer */}
        {items.length > 0 && (
          <Box sx={{ p: 2.5, borderTop: '1px solid', borderColor: 'grey.200' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>Total</Typography>
              <Typography variant="h6" fontWeight={700} color="primary.main">{formatPrice(totalPrice)}</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Button
              fullWidth
              variant="contained"
              size="large"
              component="a"
              href="tel:+91XXXXXXXXXX"
              sx={{ mb: 1.5 }}
            >
              Call:  +91 XXXXX XXXXX
            </Button>
            <Button fullWidth variant="outlined" onClick={onClose}>
              Continue Shopping
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}