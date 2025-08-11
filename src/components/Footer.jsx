// firesstore:/src/components/Footer.jsx
import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  return (
    <FooterWrap>
      <Container>
        <Row>
          <Col1>
            <H3>Download Our App</H3>
            <P>Download App for Android and ios mobile phone.</P>
            <AppLogos>
              <img src='/images/play-store.png' alt='Get it on Google Play' />
              <img
                src='/images/app-store.png'
                alt='Download on the App Store'
              />
            </AppLogos>
          </Col1>

          <Col2>
            <Logo src='/images/logo-short.png' alt='Brand short logo' />
            <P>
              Our Purpose Is To Sustainably Make the Pleasure and Benefits of
              Sports Accessible to the Many.
            </P>
          </Col2>

          <Col3>
            <H3>Useful Links</H3>
            <List>
              <li>Coupons</li>
              <li>Blog Post</li>
              <li>Return Policy</li>
              <li>Join Affiliate</li>
            </List>
          </Col3>

          <Col4>
            <H3>Follow Us</H3>
            <List>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>YouTube</li>
            </List>
          </Col4>
        </Row>

        <HR />
        <Copy className='copyright'>Copyright 2020 - Bernard Major</Copy>
      </Container>
    </FooterWrap>
  );
}

/* ===========================
   styled-components (below)
   =========================== */

const FooterWrap = styled.footer`
  background: #000;
  color: #8a8a8a;
  font-size: 14px;
  padding: 60px 0 20px;
`;

const Container = styled.div`
  max-width: 1300px;
  margin: auto;
  padding: 0 25px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;

  @media (max-width: 600px) {
    text-align: center;
  }
`;

const baseCol = `
  min-width: 250px;
  margin-bottom: 20px;
`;

const Col1 = styled.div`
  ${baseCol}
  flex-basis: 30%;
`;

const Col2 = styled.div`
  ${baseCol}
  flex: 1;
  text-align: center;
`;

const Col3 = styled.div`
  ${baseCol}
  flex-basis: 12%;
`;

const Col4 = styled.div`
  ${baseCol}
  flex-basis: 12%;
`;

const H3 = styled.h3`
  color: #fff;
  margin-bottom: 20px;
`;

const P = styled.p`
  color: #8a8a8a;
`;

const AppLogos = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;

  img {
    width: 140px;
  }

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const Logo = styled.img`
  width: 180px;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style: none;

  li {
    display: block;
    line-height: 1.9;
  }
`;

const HR = styled.hr`
  border: none;
  background: #b5b5b5;
  height: 1px;
  margin: 20px 0;
`;

const Copy = styled.p`
  text-align: center;
`;
