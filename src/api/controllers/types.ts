export type PostBody = {
  id: string,
  name: string;
  location: string;
  recommendedBy: string;
  facilities: {
    wifi: boolean;
    beverages: boolean;
    snacks: boolean;
    meals: boolean;
    sockets: boolean;
    musholla: boolean;
    carParking: boolean;
    motorParking: boolean;
    babyChair: boolean
    meetingRoom: boolean;
  }
}