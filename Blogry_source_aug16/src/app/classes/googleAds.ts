export interface GoogleAds {
  _id?: string,
  campaignName: string,
  blog: string,
  heading1: string,  // auto from blog title
  heading2: string,
  heading3: string,
  image1: string, // image name
  image2: string, // image file
  image3: string, // image file
  description1?: string, // auto from blog description
  description2?: string,
  description3?: string,
  tags: any[],
  category: string,
  // address start
  street1: string,
  street2: string,
  country: string,
  state: string,
  city: string,
  pincode: number,
  // address end
  advertise_nearby: boolean,
  nearby: string, // selections(country/city/state/pincode)
  amount_per_day: number,
  days: number,
  total_amount: number,
  is_paid?: boolean,
  payment_id?: string,
  is_start?: boolean,
  is_end?: boolean,
  start_date?: Date,
  end_date?: Date,
  is_approved?: boolean,
  is_rejected?: boolean,
  reject_reasons?: any[],
  createdAt: string,
  updatedAt: string
}
