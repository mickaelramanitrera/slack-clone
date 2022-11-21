import { useEffect } from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Sheet from '@mui/joy/Sheet';
import { useNavigate } from 'react-router-dom';
import splash from '../../../assets/splash-people.jpg';

interface LoginProps {
  title?: string;
  subtitle?: string;
}

const Login: React.FC<LoginProps> = ({
  title
}) => {
  const { setMode } = useColorScheme();
  useEffect(() => {
    setMode('light');
  }, [setMode]);

  const navigate = useNavigate();

  return (
    <div>
      <img
        src={splash}
        alt="splash-screen"
        style={{
          display: 'block',
          maxWidth: '400px',
          minWidth: '200px',
          margin: 'auto',
          marginTop: '2rem',
          width: '70%'
        }}
      />
      <Sheet
        variant="outlined"
        sx={{
          width: 300,
          mx: 'auto', // margin left & right
          my: 2, // margin top & botom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md'
        }}
      >
        <Typography level="h4" component="h1">
          {title}
        </Typography>
        <Typography level="body2">
          where you can safely talk with your
          friends
        </Typography>

        <TextField
          name="email"
          type="email"
          placeholder="youremail@email.com"
          label="Email"
        />
        <TextField
          name="password"
          type="password"
          placeholder="password"
          label="Password"
        />

        <Button
          sx={{ mt: 1 }}
          onClick={() => navigate('/chat')}
        >
          Log in
        </Button>
        <Typography
          endDecorator={
            <Link href="/sign-up">Sign up</Link>
          }
          fontSize="sm"
          sx={{ alignSelf: 'center' }}
        />
      </Sheet>
    </div>
  );
};

export default Login;
