export interface KindeOrganization {
    orgCode: string;
    orgName: string;
    properties: {
        org_city: string;
        org_country: string;
        org_industry: string;
        org_postcode: string;
        org_state_region: string;
        org_street_address: string;
        org_street_address_2: string;
    };
}