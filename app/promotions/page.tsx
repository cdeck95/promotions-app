import { ModeToggle } from "@/components/ui/mode-toggle";
import { Promotion, columns } from "./columns";
import { DataTable } from "./data-table";

const promotions: Promotion[] = [
  {
    id: 1,
    platform: "Fanduel",
    code: "ACQB5G150AWBNJ",
    title: "Bet $5+, Get $150 in Bonus Bets if Your First Bet Wins",
    description:
      "New Customers Only. Must be first cash wager on the FanDuel Sportsbook",
    url: "https://promos.sportsbook.fanduel.com/promotion?promoCode=ACQB5G150AWBNJ&hideHeader=true&hideFooter=true",
    image:
      "https://d1m565i184w2i9.cloudfront.net/cpp/fd/2024/2/7/2024-02-07_21-02-47_600x300.jpg",
    datetime: new Date("2024-02-14T16:21:42"),
  },
  {
    id: 2,
    platform: "Fanduel",
    code: "LONBALIVEPB0214",
    title: "NBA Live Profit Boost",
    description:
      "All customers get a 30% Profit Boost to use on a Live Wager on any NBA Game taking place on February 14th, 2024!",
    url: "https://promos.sportsbook.fanduel.com/promotion?promoCode=LONBALIVEPB0214&hideHeader=true&hideFooter=true",
    image:
      "https://d1m565i184w2i9.cloudfront.net/cpp/fd/2024/2/12/2024-02-12_15-47-59_600x300.jpg",
    datetime: new Date("2024-02-14T16:21:42"),
  },
  {
    id: 3,
    platform: "Fanduel",
    code: "RAF7575012024CAS",
    title: "Refer A Friend",
    description:
      "Invite your friends to join FanDuel and you’ll both get $50 in Bonus Bets on Sportsbook + $25 in Casino Credit when they use your referral link.",
    url: "https://promos.sportsbook.fanduel.com/promotion?promoCode=RAF7575012024CAS&hideHeader=true&hideFooter=true",
    image:
      "https://d1m565i184w2i9.cloudfront.net/cpp/fd/2024/2/13/2024-02-13_23-01-02_600x300.jpg",
    datetime: new Date("2024-02-14T16:21:42"),
  },
  {
    id: 4,
    platform: "Fanduel",
    code: "ATLAHSM240131",
    title: "Gronk Giveaway",
    description: "Win a Gronk-Signed Football",
    url: "https://promos.sportsbook.fanduel.com/promotion?promoCode=ATLAHSM240131&hideHeader=true&hideFooter=true",
    image:
      "https://d1m565i184w2i9.cloudfront.net/cpp/fd/2024/1/31/2024-01-31_15-57-34_600x300.jpg",
    datetime: new Date("2024-02-14T16:21:42"),
  },
  {
    id: 5,
    platform: "Fanduel",
    code: "DAILYJACKPOTSNJ2",
    title: "Daily Jackpots",
    description:
      "Your next spin could be a BIG WIN! Our Daily Jackpots guarantee to crown a winner every single day by 11pm Eastern Time. Take a shot at today’s jackpot!",
    url: "https://promos.sportsbook.fanduel.com/promotion?promoCode=DAILYJACKPOTSNJ2&hideHeader=true&hideFooter=true",
    image:
      "https://d1m565i184w2i9.cloudfront.net/cpp/fd/2023/8/11/2023-08-11_18-55-16_600x300.jpg",
    datetime: new Date("2024-02-14T16:21:42"),
  },
  {
    id: 6,
    platform: "Fanduel",
    code: "REWMACHSBK1",
    title: "Win Up To $2000 Every Day!",
    description:
      "Play Reward Machine™ for your daily free chance to win up to $2000 in Casino Bonus, plus a chance to win an extra $1000 every week with Bonus Draw!",
    url: "https://promos.sportsbook.fanduel.com/promotion?promoCode=REWMACHSBK1&hideHeader=true&hideFooter=true",
    image:
      "https://d1m565i184w2i9.cloudfront.net/cpp/fd/2024/1/3/2024-01-03_21-26-49_600x300.jpg",
    datetime: new Date("2024-02-14T16:21:42"),
  },
  {
    id: 7,
    platform: "Fanduel",
    code: "ATLFDEH231205A",
    title: "Go From Huh? To Aha!",
    description:
      "Check out our game guides and videos to learn how to play some of the most exciting Casino games.",
    url: "https://promos.sportsbook.fanduel.com/promotion?promoCode=ATLFDEH231205A&hideHeader=true&hideFooter=true",
    image:
      "https://d1m565i184w2i9.cloudfront.net/cpp/fd/2024/1/4/2024-01-04_20-52-29_600x300.jpg",
    datetime: new Date("2024-02-14T16:21:42"),
  },
  {
    id: 8,
    platform: "Draftkings",
    code: "5QKY2",
    title: "New Customers: Get a No Sweat Bet up to $1,000!",
    description:
      "Get a Bonus Bet up to $1,000 if your first bet on site loses!",
    url: "https://sportsbook.draftkings.com/promos",
    image:
      "https://sportsbook.draftkings.com/static/promos/images/20240208T081934_OSB_None_ACQ Bet5Get150instantly_CRM_PROMO_PromoPage_240x200_BonusBets.png",
    datetime: new Date("2024-02-14T16:21:43"),
  },
  {
    id: 9,
    platform: "Draftkings",
    code: "OK98Y",
    title: "50% All Sport Profit Boost",
    description: "Get a 50% profit boost on any bet today!",
    url: "https://sportsbook.draftkings.com/promos",
    image:
      "https://sportsbook.draftkings.com/static/promos/images/20240210T080243_OSB_MULT_AnySportBoost_CRM_Promo_PromoPage_240x200.png",
    datetime: new Date("2024-02-14T16:21:43"),
  },
  {
    id: 10,
    platform: "Draftkings",
    code: "W135J",
    title: "All Sport Same Game Parlay Insurance",
    description:
      "Use your token to place a 3+ leg Same Game Parlay and get a Bonus Bet back if only one leg loses!",
    url: "https://sportsbook.draftkings.com/promos",
    image:
      "https://sportsbook.draftkings.com/static/promos/images/20240128T074812_2024-01-26 21_28_26 OSB_CRMPromos_BAU BAU_bau_240x200_Promo_Pg LeftAlligned_bau.png",
    datetime: new Date("2024-02-14T16:21:43"),
  },
];

export default async function DemoPage() {
  return (
    <div className="container mx-auto py-10 flex flex-col gap-4">
      <ModeToggle />
      <DataTable columns={columns} data={promotions} />
    </div>
  );
}
