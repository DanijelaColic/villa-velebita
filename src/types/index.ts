export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Reservation {
  id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  num_guests: number;
  check_in: string;
  check_out: string;
  message?: string;
  status: BookingStatus;
  total_price: number;
  created_at: string;
}

export interface BookingFormData {
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  num_guests: number;
  check_in: string;
  check_out: string;
  message?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}
