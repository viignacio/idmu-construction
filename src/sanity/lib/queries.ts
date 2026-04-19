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
  logo,
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
      "backgroundVideoUrl": backgroundVideo.asset->url
    },
    _type == "textWithGrid" => {
      ...,
      gridItems[]{
        ...,
        "iconUrl": icon.asset->url
      }
    },
    _type == "projectShowcase" => {
      ...,
      projects[]{
        ...,
        project->{
          title,
          sector,
          "year": select(
            defined(completionDate) => string::split(completionDate, "-")[0],
            defined(startDate) => string::split(startDate, "-")[0],
            year
          ),
          status,
          completionPercentage,
          location,
          mainImage,
          "slug": slug.current
        }
      }
    },
    _type == "projectGrid" => {
      ...,
      "projects": *[_type == "project"] | order(startDate desc) {
        title,
        sector,
        "year": select(
          defined(completionDate) => string::split(completionDate, "-")[0],
          defined(startDate) => "Est. " + string::split(startDate, "-")[0],
          year
        ),
        status,
        completionPercentage,
        location,
        ctaLabel,
        mainImage,
        "slug": slug.current
      }
    },
    _type == "newsShowcase" => {
      ...,
      "featuredUpdate": *[_type == "news" && category == "Update"] | order(date desc)[0] {
        title,
        excerpt,
        category,
        date,
        author,
        mainImage,
        "slug": slug.current
      },
      "recentNews": *[_type == "news" && category != "Update"] | order(date desc)[0...2] {
        title,
        excerpt,
        category,
        date,
        author,
        mainImage,
        "slug": slug.current
      }
    },
    _type == "personnelGrid" => {
      ...,
      members[]->{
        name,
        position,
        profileImage,
        bio,
        socialLinks
      }
    },
    _type == "newsGrid" => {
      ...,
      "news": *[_type == "news"] | order(date desc) {
        _id,
        title,
        category,
        date,
        author,
        mainImage,
        excerpt,
        "slug": slug.current
      }
    }
  }
}`);

export const PROJECT_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  sector,
  "year": select(
    defined(completionDate) => string::split(completionDate, "-")[0],
    defined(startDate) => "Est. " + string::split(startDate, "-")[0],
    year
  ),
  startDate,
  completionDate,
  status,
  completionPercentage,
  location,
  client,
  mainImage,
  description[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": reference->slug.current,
        "type": reference->_type
      }
    }
  },
  gallery[]{
    ...
  }
}`);

export const NEWS_QUERY = defineQuery(`*[_type == "news" && slug.current == $slug][0]{
  title,
  category,
  date,
  author,
  mainImage,
  excerpt,
  content[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": reference->slug.current,
        "type": reference->_type
      }
    }
  }
}`);
