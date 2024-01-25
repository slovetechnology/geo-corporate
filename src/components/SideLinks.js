import { BsQrCodeScan, BsWifi } from "react-icons/bs";
import { ImBullhorn } from "react-icons/im";
import { SlChart, SlHome, SlMap, SlNotebook, SlPresent, SlTag } from "react-icons/sl";

const homeurl = ['/geo/board']
const finanaceurl = ['/geo/transactions']
const dealsurl = [
  "",
  "",
  "",
  ""
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
      title: `deals`,
      Icon: SlTag,
      hasMenu: true,
      url: '',
      all: '/deal',
      menu: [
        {
          title: `All Deals`,
          url: dealsurl[0]
        },
        {
          title: `Enquiries`,
          url: dealsurl[3]
        },
      ]
    },
  ]