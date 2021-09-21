import { Helmet } from 'react-helmet'

const Meta = (props) => {
   return (
      <Helmet>
         <title>{props.title}</title>
         <meta name="description" content={props.description} />
         <meta name="keywords" content={props.keywords} />
      </Helmet>
   )
}

Meta.defaultProps = {
   title: "Welcome to SkyZen",
   description: "The best items on the market, you will find them all here",
   keywords: "gadgets, electronics, premium items"
}

export default Meta
