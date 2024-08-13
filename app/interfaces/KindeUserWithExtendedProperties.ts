class User {
  id: string;
  email: string | null;
  given_name: string | null;
  family_name: string | null;
  picture: string | null;

  constructor(
    id: string,
    email: string | null,
    given_name: string | null,
    family_name: string | null,
    picture: string | null
  ) {
    this.id = id;
    this.email = email;
    this.given_name = given_name;
    this.family_name = family_name;
    this.picture = picture;
  }
}

class ExtendedUser extends User {
  phone_number: string | null;
  username: string | null;
  properties: {
    city: string | undefined;
    industry: string | undefined;
    job_title: string | undefined;
    middle_name: string | undefined;
    postcode: string | undefined;
    salutation: string | undefined;
    state_region: string | undefined;
    street_address: string | undefined;
    street_address_2: string | undefined;
  };

  constructor(
    id: string,
    email: string | null,
    given_name: string | null,
    family_name: string | null,
    picture: string | null,
    phone_number: string | null = null,
    username: string | null = null,
    properties: {
      city?: string;
      industry?: string;
      job_title?: string;
      middle_name?: string;
      postcode?: string;
      salutation?: string;
      state_region?: string;
      street_address?: string;
      street_address_2?: string;
    } = {}
  ) {
    super(id, email, given_name, family_name, picture);
    this.phone_number = phone_number;
    this.username = username;
    this.properties = {
      city: properties.city,
      industry: properties.industry,
      job_title: properties.job_title,
      middle_name: properties.middle_name,
      postcode: properties.postcode,
      salutation: properties.salutation,
      state_region: properties.state_region,
      street_address: properties.street_address,
      street_address_2: properties.street_address_2,
    };
  }
}
