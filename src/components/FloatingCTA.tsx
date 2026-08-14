import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import PhoneIcon from '@mui/icons-material/Phone';
import useScrollTrigger from '@mui/material/useScrollTrigger';

export default function FloatingCTA() {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 300 });

  return (
    <>
      {/* Desktop floating button */}
      <Box sx={{ position: 'fixed', bottom: 32, right: 24, zIndex: 1200, display: { xs: 'none', md: 'flex' } }}>
        <Zoom in={trigger}>
          <Tooltip title="Call Now: +91 XXXXX XXXXX" placement="left">
            <Fab
              component="a"
              href="tel:+91XXXXXXXXXX"
              sx={{ width: 56, height: 56, background: 'linear-gradient(135deg, #2e7d32, #4caf50)', boxShadow: '0 6px 20px rgba(46,125,50,0.4)', animation: 'pulse 2s infinite' }}
            >
              <PhoneIcon sx={{ color: '#fff', fontSize: 26 }} />
            </Fab>
          </Tooltip>
        </Zoom>
      </Box>

      {/* Mobile sticky bottom bar */}
      <Box
        component="a"
        href="tel:+91XXXXXXXXXX"
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          py: 1.75,
          background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
          color: '#fff',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '0.85rem',
          borderTop: '1px solid',
          borderColor: 'grey.200',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <PhoneIcon sx={{ fontSize: 18 }} />
        Call: +91 XXXXX XXXXX
      </Box>

      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(46,125,50,0.4); }
          70% { box-shadow: 0 0 0 12px rgba(46,125,50,0); }
          100% { box-shadow: 0 0 0 0 rgba(46,125,50,0); }
        }
      `}</style>
    </>
  );
}