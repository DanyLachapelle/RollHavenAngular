interface CampaignUser {
  id: number;
  id_user: number;
  id_campaign: number;
  role: string;
  user: {
    id: number;
    pseudo: string;
    email: string;
    password: string;
    role: string;
    isLoggedIn: boolean;
  };
  campaign: {
    id: number;
    name: string;
    accessibility: string;
  };
}
