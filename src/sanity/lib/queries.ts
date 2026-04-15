import { defineQuery } from "next-sanity";

export const HEADER_QUERY = defineQuery(`*[_type == "header"][0]{
  brandName,
  links[]{
    text,
    url
  },
  cta{
    text,
    url
  }
}`);

export const FOOTER_QUERY = defineQuery(`*[_type == "footer"][0]{
  brandName,
  description,
  column1{
    title,
    links[]{
      text,
      url
    }
  },
  column2{
    title,
    links[]{
      text,
      url
    }
  },
  connect{
    title
  },
  copyright,
  attribution
}`);

export const BUSINESS_INFO_QUERY = defineQuery(`*[_type == "business"][0]{
  name,
  "logoUrl": logo.asset->url,
  email,
  phone,
  address
}`);

export const PAGE_QUERY = defineQuery(`*[_type == "page" && (slug.current == $slug || ($slug == "home" && slug.current == "/"))][0]{
  title,
  modules[]{
    ...,
    _type == "hero" => {
      ...,
      "backgroundVideo": backgroundVideo.asset->url
    },
    _type == "textWithGrid" => {
      ...,
      gridItems[]{
        ...,
        "iconUrl": icon.asset->url
      }
    }

  }
}`);




