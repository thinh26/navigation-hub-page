import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// register tất cả plugin tại 1 nơi duy nhất
gsap.registerPlugin(useGSAP);

export { gsap, useGSAP };
