import HouseIcon from '@mui/icons-material/House';
import ArticleIcon from '@mui/icons-material/Article';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
export const NavBarData = [
  {
    text: "INICIO",
    to: "/",
    Icon: <HouseIcon/>,
  },
  {
    text: "RESEÑA",
    to: "/historia",
    Icon: <ArticleIcon/>,
  },
  {
    text: "NOVEDADES",
    to: "/noticias",
    Icon: <NewspaperIcon/>,
  },
  {
    text: "SOLICITUDES",
    to: "/solicitardocumentos",
    Icon: <LocalPrintshopIcon />,
  }
];