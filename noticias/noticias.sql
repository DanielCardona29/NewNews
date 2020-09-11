-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-09-2020 a las 00:38:01
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `noticias`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `avatars`
--

CREATE TABLE `avatars` (
  `id` varchar(50) NOT NULL,
  `url` text NOT NULL,
  `userid` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `avatars`
--

INSERT INTO `avatars` (`id`, `url`, `userid`) VALUES
('50u2x15rokeytght9', 'http://localhost:5000/avatars/images/50u2x15rokeythclpavataaars.png', '50u2x1aogke52qvvk');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coments`
--

CREATE TABLE `coments` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `date` varchar(50) NOT NULL,
  `idnewcoment` int(6) NOT NULL,
  `idusercoment` varchar(50) NOT NULL,
  `Punt` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `coments`
--

INSERT INTO `coments` (`id`, `content`, `date`, `idnewcoment`, `idusercoment`, `Punt`) VALUES
(3, 'esto es otra bobada', '2020/8/21 28:3:55:691', 6, '50u2x1czgke4wn46j', 0),
(4, 'Hola Gente', '2020/7/5 3:13:28:691', 2, '50u2x1czgke4wjpfq', 4),
(6, 'dadad', '2020/7/5 3:32:28:832', 2, '50u2x1czgke4kfdwi', 1),
(7, 'Hola Perros que se diceeeee', '2020/7/5 3:37:46:215', 2, '50u2x1czgke4kfdwi', 1),
(47, 'Hola soy nuevo que pez con este sitio ??', '2020/7/6 1:38:16:235', 5, '50u2x1bxkkefam2le', 1),
(48, 'Hola', '2020/7/6 1:40:42:548', 4, '50u2x1bxkkefam2le', 1),
(49, 'dw', '2020/7/0 22:7:3:743', 5, '50u2x1aogke52qvvk', 1),
(53, 'ddwd', '2020/7/1 0:34:24:612', 4, 'rd4jz8uskei24yc0', 1),
(92, 'DAWDAWD', '2020/8/2 0:13:7:213', 4, '50u2x1aogke52qvvk', 1),
(94, 'Que mas perros', '2020/8/2 0:23:24:64', 2, '50u2x1aogke52qvvk', 1),
(95, 'ay que pedoooo\n', '2020/8/2 0:25:37:400', 2, '50u2x1aogke52qvvk', 1),
(98, 'Como es que dice gente!!!!!!!!!!', '2020/8/2 1:16:28:570', 2, '50u2x1aogke52qvvk', 1),
(99, 'dawdawd', '2020/8/2 12:32:4:131', 5, '50u2x1aogke52qvvk', 1),
(101, 'dawd', '2020/9/5 17:29:25:830', 6, '50u2x1aogke52qvvk', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentslikes`
--

CREATE TABLE `comentslikes` (
  `id` int(6) NOT NULL,
  `likeCom` int(1) NOT NULL,
  `userid` varchar(50) NOT NULL,
  `commentid` int(6) NOT NULL,
  `newsid` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comentslikes`
--

INSERT INTO `comentslikes` (`id`, `likeCom`, `userid`, `commentid`, `newsid`) VALUES
(39, 1, '50u2x1czgke4kfdwi', 3, 6),
(40, 1, '50u2x1czgke4kfdwi', 4, 2),
(42, 1, '50u2x1czgke4kfdwi', 7, 2),
(44, 1, '50u2x1aogke52qvvk', 6, 2),
(50, 1, '50u2x1bxkkefam2le', 47, 5),
(51, 0, '50u2x1czgke4wjpfq', 48, 4),
(52, 0, '50u2x1aogke52qvvk', 49, 5),
(53, 1, '50u2x1aogke52qvvk', 47, 5),
(60, 1, 'rd4jz8uskei24yc0', 49, 5),
(64, 1, '50u2x1aogke52qvvk', 7, 2),
(66, 1, '50u2x1aogke52qvvk', 53, 4),
(67, 0, '50u2x1aogke52qvvk', 48, 4),
(70, 1, '50u2x1aogke52qvvk', 92, 4),
(72, 1, '50u2x1aogke52qvvk', 95, 2),
(73, 1, '50u2x1aogke52qvvk', 95, 2),
(74, 1, '50u2x1aogke52qvvk', 94, 2),
(75, 1, '50u2x1aogke52qvvk', 94, 2),
(76, 0, '50u2x1aogke52qvvk', 4, 2),
(77, 0, '50u2x1aogke52qvvk', 4, 2),
(78, 1, '50u2x1aogke52qvvk', 99, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `news`
--

CREATE TABLE `news` (
  `id` int(6) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `img` text NOT NULL,
  `date` varchar(20) NOT NULL,
  `userid` varchar(50) NOT NULL,
  `aling` varchar(50) NOT NULL DEFAULT 'center',
  `ispublic` varchar(50) NOT NULL DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `news`
--

INSERT INTO `news` (`id`, `title`, `content`, `img`, `date`, `userid`, `aling`, `ispublic`) VALUES
(1, 'Hola carambola', 'Ahora este es el conetenido contenido 2', 'https://cde.laprensa.e3.pe/ima/0/0/2/3/8/238082.jpg', '2020/7/3 18:8:25:282', '50u2x17hkke1zkkzi', 'center', 'true'),
(2, 'Hola car', 'Ahora este es el conetenido contenido 2', 'https://images.ctfassets.net/hrltx12pl8hq/VZW7M82mrxByGHjvze4wu/216d9ff35b6980d850d108a50ae387bf/Carousel_01_FreeTrial.jpg?fit=fill&w=800&h=450', '2020/7/3 20:16:52:62', '50u2x17hkke1zkkzi', 'center', 'true'),
(3, 'Homero simpson', 'Ahora este es el conetenido contenido 2', 'https://www.opcionesyfuturos.net/wp-content/uploads/2014/08/untitled.png', '2020/7/3 22:3:55:691', '50u2x17hkke1zkkzi', 'center', 'true'),
(4, 'Bart Simpson', 'Ahora este es el conetenido contenido 2', 'data:image/png;base64,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', '2020/7/5 0:16:23:587', '50u2x17hkke1zkkzi', 'center', 'true'),
(5, 'Marge simpson', '<div class=\'esttextoenriquecido cuerpoTexto\'>\r\n    <p dir=\'ltr\' style=\'font-family: FSJoey-Regular !important;\'>Conoce los cursos y contenidos&nbsp;<strong>100% gratuitos y en línea</strong>, para ti y tus colaboradores, durante el mes de&nbsp;<strong>Agosto</strong>. Esta es una invitación a estar al día con&nbsp;<a href=\'https://www.proteccion.com/universidad?utm_source=Email&amp;utm_medium=Email&amp;utm_campaign=ProgramacionUPEmpresas\' target=\'_blank\' class=\'link\'>Universidad Protección.&nbsp;</a><br>\r\n<br>\r\n<strong>Martes 4</strong><br>\r\nPensamiento Creativo<br>\r\n10:00 a.m.<br>\r\n<a href=\'https://register.gotowebinar.com/register/4877165708435687183\' target=\'_blank\' class=\'link\'>Inscríbete aquí</a><br>\r\n<br>\r\n<strong>Miércoles&nbsp;5</strong><br>\r\nRequerimientos de la UGPP en tiempo de Covid-19<br>\r\n11:00 a.m.&nbsp;<br>\r\n<a href=\'https://register.gotowebinar.com/register/4877165708435687183\' target=\'_blank\' class=\'link\'>Inscríbete aquí</a><br>\r\n<br>\r\n<strong>Martes 11</strong><br>\r\nEstrategias de Negocios para el Mercado Digital<br>\r\n3:00 p.m.<br>\r\n<a href=\'https://register.gotowebinar.com/register/4877165708435687183\' target=\'_blank\' class=\'link\'>Inscríbete aquí</a><br>\r\n<br>\r\n<strong>Miércoles 12</strong><br>\r\nCómo manejar los datos personales bajo el marco de los protocolos de bioseguridad<br>\r\n11:00 a.m.<br>\r\n<a href=\'https://register.gotowebinar.com/register/4877165708435687183\' target=\'_blank\' class=\'link\'>Inscríbete aquí</a><br>\r\n<br>\r\n<strong>Jueves 13</strong><br>\r\nRomper paradigmas culturales a través del agilismo en escala<br>\r\n10:00 a.m.<br>\r\n<a href=\'https://register.gotowebinar.com/register/4877165708435687183\' target=\'_blank\' class=\'link\'>Inscríbete aquí</a></p>\r\n\r\n<p dir=\'ltr\' style=\'font-family: FSJoey-Regular !important;\'><strong>Miércoles 19</strong><br>\r\n¿Cómo transformar sus eventos físicos a virtuales con éxito?<br>\r\n11:00 a.m.&nbsp;<br>\r\n<a href=\'https://register.gotowebinar.com/register/4877165708435687183\' target=\'_blank\' class=\'link\'>Inscríbete aquí</a><br>\r\n<br>\r\n<strong>Martes 25</strong><br>\r\nLiderazgo Personal<br>\r\n3:00 p.m.<br>\r\n<a href=\'https://register.gotowebinar.com/register/4877165708435687183\' target=\'_blank\' class=\'link\'>Inscríbete aquí</a><br>\r\n<br>\r\n<strong>Miércoles 26</strong><br>\r\n¿Cómo crear un ecosistema digital con éxito para incrementar ventas?<br>\r\n11:00 a.m.&nbsp;<br>\r\n<a href=\'https://register.gotowebinar.com/register/4877165708435687183\' target=\'_blank\' class=\'link\'>Inscríbete aquí</a><br>\r\n<br>\r\n<strong>3 al 25 de Agosto</strong><br>\r\nDiplomado: Tendencias globales del Talento Humano Post Pandemia<br>\r\nLunes, martes y miércoles&nbsp;6:30 pm.&nbsp;<br>\r\n<a href=\'https://register.gotowebinar.com/register/4877165708435687183\' target=\'_blank\' class=\'link\'>Inscríbete aquí</a><br>\r\n<br>\r\n<strong>6 al 28 de Agosto</strong><br>\r\nCurso: Teletrabajo y Trabajo Remoto desde el punto Legal y Metodológico<br>\r\nJueves y viernes 6:30 pm.&nbsp;<br>\r\n<a href=\'https://register.gotowebinar.com/register/4877165708435687183\' target=\'_blank\' class=\'link\'>Inscríbete aquí</a><br>\r\n&nbsp;</p>\r\n\r\n<p dir=\'ltr\'>Aprende <a href=\'/wps/wcm/connect/proteccion/5559294c-027c-4f12-a184-773994712d65/Paso+a+paso+para+acceder+a+contenidos+de+Unipymes+para+empresas+%281%29.pdf?MOD=AJPERES\' target=\'_blank\' style=\'cursor: pointer;\'> aquí</a> el paso a paso para que ingreses fácilmente a los contenidos de Unipymes.</p>\r\n\r\n<p dir=\'ltr\'><br>\r\n<style type=\'text/css\'>.link {\r\n                                font-family: \'FSJoey-Regular\' !important;\r\n                                text-decoration: none;\r\n                                color: #008AD1;\r\n                        }\r\n        \r\n        \r\n        \r\n                        p {\r\n                                font-size: 16px !important;\r\n                        }\r\n        \r\n                        .margin-bottom {\r\n                                margin-bottom: 50px;\r\n                        }\r\n</style>\r\n</p>\r\n<!--[if mso]><table width=\'550\' cellpadding=\'0\' cellspacing=\'0\'><tr><td width=\'188\' valign=\'top\'><![endiborder: 0px !important; f]-->\r\n\r\n<table align=\'left\' cellpadding=\'0\' cellspacing=\'0\' class=\'es-left\' dir=\'ltr\' style=\'border: 0px !important; mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;\'>\r\n<tbody>\r\n    <tr style=\'border-collapse:collapse; border: 0px !important;\'>\r\n    </tr>\r\n</tbody>\r\n</table>\r\n\r\n\r\n\r\n</div>', 'https://sites.google.com/site/thesimpsons0241/_/rsrc/1284605380818/marge-simpson/Marge_Simpson.png', '2020/8/21 22:3:55:69', '50u2x1czgke4kfdwi', 'center', 'true'),
(6, 'Lisa simpson', '<div class=\'esttextoenriquecido cuerpoTexto\'>\r\n    <p dir=\'ltr\' style=\'font-family: FSJoey-Regular !important;\'>Conoce los cursos y contenidos&nbsp;<strong>100% gratuitos y en línea</strong>, para ti y tus colaboradores, durante el mes de&nbsp;<strong>Agosto</strong>. Esta es una invitación a estar al día con&nbsp;<a href=\'https://www.proteccion.com/universidad?utm_source=Email&amp;utm_medium=Email&amp;utm_campaign=ProgramacionUPEmpresas\' target=\'_blank\' class=\'link\'>Universidad Protección.&nbsp;</a><br>\r\n<br>\r\n<strong>Martes 4</strong><br>\r\nPensamiento Creativo<br>\r\n10:00 a.m.<br>\r\n<a href=\'https://register.gotowebinar.com/register/4877165708435687183\' target=\'_blank\' class=\'link\'>Inscríbete aquí</a><br>\r\n<br>\r\n<strong>Miércoles&nbsp;5</strong><br>\r\nRequerimientos de la UGPP en tiempo de Covid-19<br>\r\n11:00 a.m.&nbsp;<br>\r\n<a href=\'https://register.gotowebinar.com/register/4877165708435687183\' target=\'_blank\' class=\'link\'>Inscríbete aquí</a><br>\r\n<br>\r\n<strong>Martes 11</strong><br>\r\nEstrategias de Negocios para el Mercado Digital<br>\r\n3:00 p.m.<br>\r\n<a href=\'https://register.gotowebinar.com/register/4877165708435687183\' target=\'_blank\' class=\'link\'>Inscríbete aquí</a><br>\r\n<br>\r\n<strong>Miércoles 12</strong><br>\r\nCómo manejar los datos personales bajo el marco de los protocolos de bioseguridad<br>\r\n11:00 a.m.<br>\r\n<a href=\'https://register.gotowebinar.com/register/4877165708435687183\' target=\'_blank\' class=\'link\'>Inscríbete aquí</a><br>\r\n<br>\r\n<strong>Jueves 13</strong><br>\r\nRomper paradigmas culturales a través del agilismo en escala<br>\r\n10:00 a.m.<br>\r\n<a href=\'https://register.gotowebinar.com/register/4877165708435687183\' target=\'_blank\' class=\'link\'>Inscríbete aquí</a></p>\r\n\r\n<p dir=\'ltr\' style=\'font-family: FSJoey-Regular !important;\'><strong>Miércoles 19</strong><br>\r\n¿Cómo transformar sus eventos físicos a virtuales con éxito?<br>\r\n11:00 a.m.&nbsp;<br>\r\n<a href=\'https://register.gotowebinar.com/register/4877165708435687183\' target=\'_blank\' class=\'link\'>Inscríbete aquí</a><br>\r\n<br>\r\n<strong>Martes 25</strong><br>\r\nLiderazgo Personal<br>\r\n3:00 p.m.<br>\r\n<a href=\'https://register.gotowebinar.com/register/4877165708435687183\' target=\'_blank\' class=\'link\'>Inscríbete aquí</a><br>\r\n<br>\r\n<strong>Miércoles 26</strong><br>\r\n¿Cómo crear un ecosistema digital con éxito para incrementar ventas?<br>\r\n11:00 a.m.&nbsp;<br>\r\n<a href=\'https://register.gotowebinar.com/register/4877165708435687183\' target=\'_blank\' class=\'link\'>Inscríbete aquí</a><br>\r\n<br>\r\n<strong>3 al 25 de Agosto</strong><br>\r\nDiplomado: Tendencias globales del Talento Humano Post Pandemia<br>\r\nLunes, martes y miércoles&nbsp;6:30 pm.&nbsp;<br>\r\n<a href=\'https://register.gotowebinar.com/register/4877165708435687183\' target=\'_blank\' class=\'link\'>Inscríbete aquí</a><br>\r\n<br>\r\n<strong>6 al 28 de Agosto</strong><br>\r\nCurso: Teletrabajo y Trabajo Remoto desde el punto Legal y Metodológico<br>\r\nJueves y viernes 6:30 pm.&nbsp;<br>\r\n<a href=\'https://register.gotowebinar.com/register/4877165708435687183\' target=\'_blank\' class=\'link\'>Inscríbete aquí</a><br>\r\n&nbsp;</p>\r\n\r\n<p dir=\'ltr\'>Aprende <a href=\'/wps/wcm/connect/proteccion/5559294c-027c-4f12-a184-773994712d65/Paso+a+paso+para+acceder+a+contenidos+de+Unipymes+para+empresas+%281%29.pdf?MOD=AJPERES\' target=\'_blank\' style=\'cursor: pointer;\'> aquí</a> el paso a paso para que ingreses fácilmente a los contenidos de Unipymes.</p>\r\n\r\n<p dir=\'ltr\'><br>\r\n<style type=\'text/css\'>.link {\r\n                                font-family: \'FSJoey-Regular\' !important;\r\n                                text-decoration: none;\r\n                                color: #008AD1;\r\n                        }\r\n        \r\n        \r\n        \r\n                        p {\r\n                                font-size: 16px !important;\r\n                        }\r\n        \r\n                        .margin-bottom {\r\n                                margin-bottom: 50px;\r\n                        }\r\n</style>\r\n</p>\r\n<!--[if mso]><table width=\'550\' cellpadding=\'0\' cellspacing=\'0\'><tr><td width=\'188\' valign=\'top\'><![endiborder: 0px !important; f]-->\r\n\r\n<table align=\'left\' cellpadding=\'0\' cellspacing=\'0\' class=\'es-left\' dir=\'ltr\' style=\'border: 0px !important; mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;\'>\r\n<tbody>\r\n    <tr style=\'border-collapse:collapse; border: 0px !important;\'>\r\n    </tr>\r\n</tbody>\r\n</table>\r\n\r\n\r\n\r\n</div>', 'https://i.pinimg.com/736x/b2/ed/c5/b2edc50471c452ca5d4f60257b3c2223.jpg', '2020/8/21 22:3:55:69', '50u2x1czgke4kfdwi', 'center', 'true'),
(242137, 'awdawdawd', '<p>Empieza a escribir tu noticia aquí</p>', '', '2020/9/4 17:30:22:58', '50u2x1aogke52qvvk', 'left', 'false');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stats`
--

CREATE TABLE `stats` (
  `id` int(6) NOT NULL,
  `likes` int(6) NOT NULL,
  `dislikes` int(6) NOT NULL,
  `views` int(6) NOT NULL,
  `newsid` int(6) NOT NULL,
  `userid` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `stats`
--

INSERT INTO `stats` (`id`, `likes`, `dislikes`, `views`, `newsid`, `userid`) VALUES
(1, 1, 0, 1, 2, '50u2x17hkke1zkkzi'),
(2, 0, 1, 1, 2, '50u2x1czgke4wd4qo'),
(3, 1, 0, 1, 3, '50u2x17hkke1zkkzi'),
(4, 1, 0, 1, 6, '50u2x1czgke4wd4qo'),
(5, 1, 0, 1, 6, '50u2x1aogke53a9za'),
(6, 0, 0, 1, 4, '50u2x1czgke4wnz4i'),
(7, 1, 0, 1, 4, '50u2x1aogke52qvvk'),
(8, 1, 0, 1, 6, '50u2x1aogke52qvvk'),
(9, 1, 0, 1, 5, '50u2x1aogke52qvvk'),
(10, 0, 0, 1, 3, '50u2x1aogke52qvvk'),
(11, 0, 0, 1, 1, '50u2x1aogke52qvvk'),
(12, 0, 0, 1, 5, '50u2x1czgke4kfdwi'),
(13, 0, 0, 1, 6, '50u2x1czgke4kfdwi'),
(14, 0, 0, 1, 4, '50u2x1czgke4kfdwi'),
(15, 0, 0, 1, 2, '50u2x1czgke4kfdwi'),
(16, 0, 0, 1, 3, '50u2x1czgke4kfdwi'),
(17, 0, 0, 1, 1, '50u2x1czgke4kfdwi'),
(18, 1, 0, 1, 2, '50u2x1aogke52qvvk'),
(19, 0, 0, 1, 5, '50u2x1bxkkefam2le'),
(20, 0, 0, 1, 4, '50u2x1bxkkefam2le'),
(21, 0, 0, 1, 2, '50u2x1bxkkefam2le'),
(22, 0, 0, 1, 1, '50u2x1czgke4wjpfq'),
(24, 1, 0, 1, 4, '50u2x1czgke4wjpfq'),
(25, 0, 1, 1, 6, '50u2x1czgke4wjpfq'),
(26, 1, 0, 1, 5, 'rd4jz8uskei24yc0'),
(27, 1, 0, 1, 1, 'rd4jz8uskei24yc0'),
(28, 0, 0, 1, 4, 'rd4jz8uskei24yc0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `user` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `access` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `user`, `email`, `pass`, `access`) VALUES
('50', 'Camilo', 'Cardona.321@gmail.com', '9852', '0'),
('50u2x15rokeytc10i', 'lkdknakn', 'lmdwmo@gmail.com', '568968', 'true'),
('50u2x17hkke1zkkzi', 'Camilo', 'Cardona.321@gmail.com', '9852', 'true'),
('50u2x1aogke52qvvk', 'a', 'cardonacalderondaniel@gmail.com', 'a', 'true'),
('50u2x1aogke53a9za', 'b', 'cardonacalderondaniel@gmail.com', 'b', 'false'),
('50u2x1bxkkefam2le', 'Pepegrillo', 'dapdakkdk@gmail.com', '568-h968', 'true'),
('50u2x1czgke4kfdwi', 'Daniel', 'cardonacalderondaniel@gmail.com', '568-h968', 'true'),
('50u2x1czgke4wd4qo', 'Drogo', 'dawdawda@gmail.com', '568-h968', 'true'),
('50u2x1czgke4wjpfq', 'lolco', 'jhitacki@gmail.com', '568-h968', 'true'),
('50u2x1czgke4wn46j', 'Pepepe', 'jddadwaw@gmail.com', '568968', 'true'),
('50u2x1czgke4wnz4i', 'lalalal', 'kjabdkabd@gmail.com', '568-h968', 'true'),
('rd4jz8uskei24yc0', 'Holaca', 'dadawk@gmail.com', '568-h968', 'true'),
('rd4jzh3wkehzsgpr', 'Pedropaulo', 'akndknakwn@fafnwk.com', '568968', 'true');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `coments`
--
ALTER TABLE `coments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idnewcoment` (`idnewcoment`),
  ADD KEY `idusercoment` (`idusercoment`);

--
-- Indices de la tabla `comentslikes`
--
ALTER TABLE `comentslikes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`),
  ADD KEY `commentid` (`commentid`),
  ADD KEY `newsid` (`newsid`);

--
-- Indices de la tabla `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`);

--
-- Indices de la tabla `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `newsid` (`newsid`),
  ADD KEY `userid` (`userid`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `coments`
--
ALTER TABLE `coments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT de la tabla `comentslikes`
--
ALTER TABLE `comentslikes`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT de la tabla `news`
--
ALTER TABLE `news`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=242138;

--
-- AUTO_INCREMENT de la tabla `stats`
--
ALTER TABLE `stats`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `coments`
--
ALTER TABLE `coments`
  ADD CONSTRAINT `coments_ibfk_1` FOREIGN KEY (`idnewcoment`) REFERENCES `news` (`id`),
  ADD CONSTRAINT `coments_ibfk_2` FOREIGN KEY (`idusercoment`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `comentslikes`
--
ALTER TABLE `comentslikes`
  ADD CONSTRAINT `comentslikes_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `comentslikes_ibfk_2` FOREIGN KEY (`commentid`) REFERENCES `coments` (`id`),
  ADD CONSTRAINT `comentslikes_ibfk_3` FOREIGN KEY (`newsid`) REFERENCES `news` (`id`);

--
-- Filtros para la tabla `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `stats`
--
ALTER TABLE `stats`
  ADD CONSTRAINT `stats_ibfk_1` FOREIGN KEY (`newsid`) REFERENCES `news` (`id`),
  ADD CONSTRAINT `stats_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
