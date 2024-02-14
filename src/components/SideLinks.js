import { BsQrCodeScan, BsWifi } from "react-icons/bs";
import { ImBullhorn } from "react-icons/im";
import { SlChart, SlHome, SlMap, SlNotebook, SlPeople, SlPresent, SlTag } from "react-icons/sl";

const homeurl = ['/geo/board']
const finanaceurl = ['/geo/transactions']
const passengers = [
  "/geo/passengers",
]

export const SidebarUrls = [
    {
      title: `home`,
      Icon: SlHome,
      hasMenu: false,
      url: homeurl[0],
      all: '/board',
      menu: []
    },
    {
      title: `Transactions`,
      Icon: SlChart,
      hasMenu: true,
      url: '',
      all: '/transactions',
      menu: [
        {
          title: `Transactions`,
          url: finanaceurl[0]
        },
      ]
    },
    {
      title: `Passengers`,
      Icon: SlPeople,
      hasMenu: true,
      url: '',
      all: '/passenger',
      menu: [
        {
          title: `Passengers`,
          url: passengers[0]
        },
      ]
    },
  ]