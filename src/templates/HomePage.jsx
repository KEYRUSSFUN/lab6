import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container
} from '@mui/material';

const products = [
  {
    id: 1,
    name: 'Бургер Классический',
    description: 'Сочное мясо, свежие овощи и фирменный соус.',
    image: 'https://orderapp-static.burgerkingrus.ru/x256/mobile_image/7c5cd5dd0b412f04738ebcf58a7daf1e.webp',
    price: 299,
  },
  {
    id: 2,
    name: 'Картошка Фри',
    description: 'Хрустящая и золотистая картошка.',
    image: 'https://orderapp-static.burgerkingrus.ru/x256/mobile_image/746a01ad6eaf7fa766c5a9d363c67316.webp',
    price: 149,
  },
  {
    id: 3,
    name: 'Чикенбургер',
    description: 'Нежная курочка в хрустящей панировке.',
    image: 'https://orderapp-static.burgerkingrus.ru/x256/mobile_image/5e48429805a13b08acbece18a7811ade.webp',
    price: 279,
  },
  {
    id: 4,
    name: 'Комбо Обед',
    description: 'Бургер, фри и напиток — всё в одном!',
    image: 'https://orderapp-static.burgerkingrus.ru/x256/mobile_image/408537b39bce23821c8d0a07e3e5be02.webp',
    price: 499,
  },
];

const HomePage = () => {
  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Добро пожаловать в FASTFOOD
      </Typography>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="180"
                image={product.image}
                sx={{width: '180px', margin: '0 auto', padding: '20px 0'}}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Typography fontWeight="bold">{product.price} ₽</Typography>
                <Button size="small" variant="contained" color="primary">
                  В корзину
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;