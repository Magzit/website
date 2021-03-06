import * as React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, Link } from 'gatsby'
import CookieConsent from "react-cookie-consent";

import { colors, borders } from '../styles/variables';
import GitpodIcon from '../resources/gitpod.svg';
import GitpodIcon196 from '../resources/gitpod-196x196.png';
import GitpodIconApple from '../resources/apple-touch-icon.png';

import LayoutRoot from '../components/LayoutRoot'
import LayoutMain from '../components/LayoutMain'
import Nav from '../components/Nav';
import Footer from '../components/Footer';

type StaticQueryProps = {
  site: {
    siteMetadata: {
      title: string
      description: string
      siteUrl: string
    }
  }
}

const IndexLayout: React.SFC<{ title?: string, canonical?: string }> = ({ title, canonical, children }) => (
  <StaticQuery
    query={graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => (
      <LayoutRoot>
        <Helmet>
          <html lang="en" />
          <title>{title && `${title} - Gitpod` || data.site.siteMetadata.title}</title>
          <meta name="description" content={data.site.siteMetadata.description} />
          <meta name="keywords" content="cloud ide, github ide, gitlab ide, javascript, online ide, web ide, code review" />
          {
            canonical ? <link rel="canonical" href={`${data.site.siteMetadata.siteUrl}${canonical}`} /> : null
          }
          <link href="https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap" rel="stylesheet" />
          <meta name="theme-color" content={colors.white} />
          <link rel="apple-touch-icon" type="image/png" href={GitpodIconApple} sizes="180x180" />
          <link rel="icon" type="image/png" href={GitpodIcon196} sizes="196x196" />
          <link rel="icon" type="image/svg+xml" href={GitpodIcon} sizes="any" />

          <meta name="twitter:card" content="summary"></meta>
          <meta name="twitter:site" content="@gitpod"></meta>
          <meta name="twitter:creator" content="@gitpod"></meta>

          <meta property="og:url" content={data.site.siteMetadata.siteUrl} />
          <meta property="og:title" content={title || data.site.siteMetadata.title} />
          <meta property="og:description" content={data.site.siteMetadata.description} />
          <meta property="og:image" content="https://www.gitpod.io/media-image.jpg" />

          <meta name="google-site-verification" content="NBio3hCkfn2FKJpqZritJpXuyKo54noPGZzWsjDIp-M" />
        </Helmet>
        <Nav />
        <LayoutMain>
            <CookieConsent buttonClasses="primary"
                containerClasses="consent"
                style={{
                    backgroundColor: colors.white,
                    color: colors.text,
                    borderTop: borders.light,
                }}
                contentStyle={{
                    backgroundColor: 'transparent',
                    margin: '10px 15px'
                }}
                buttonStyle={{
                    backgroundColor: 'transparent',
                    border: 'solid 1px '+colors.text,
                    borderRadius: '100px',
                    padding: '.8rem 2.2rem',
                    margin: '10px 15px'
                }}
            >
                This website uses cookies to<br /> enhance the user experience.<br /> Read our <Link style={{color: '#35C9FF'}} to="/privacy/">privacy policy</Link> for more info.
            </CookieConsent>
          {children}
        </LayoutMain>
        <Footer />
      </LayoutRoot>
    )}
  />
)

export default IndexLayout
