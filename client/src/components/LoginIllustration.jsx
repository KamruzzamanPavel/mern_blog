import { motion } from "framer-motion";

const LoginIllustration = () => {
  return (
    <div className="relative w-full max-w-md">
      <svg
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Animated background elements */}
        <motion.path
          d="M0,500 Q200,450 400,500 T800,500 L800,600 L0,600 Z"
          fill="#f0f4ff"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Decorative plants with animation */}
        <motion.g
          id="left-plant"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <path
            d="M100,400 C120,350 80,300 60,370 C40,420 90,450 100,400"
            fill="#8adb92"
          />
          <path
            d="M70,420 C90,370 50,320 30,390 C10,440 60,470 70,420"
            fill="#a5e6af"
          />
        </motion.g>

        <motion.g
          id="right-plant"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <path
            d="M700,400 C720,350 690,310 670,350 C650,400 680,430 700,400"
            fill="#d1dbf0"
          />
          <path
            d="M720,420 C740,370 710,330 690,370 C670,420 700,450 720,420"
            fill="#bfcdea"
          />
          <ellipse
            cx="710"
            cy="370"
            rx="10"
            ry="20"
            fill="#d1dbf0"
            transform="rotate(-30 710 370)"
          />
          <ellipse
            cx="730"
            cy="390"
            rx="10"
            ry="20"
            fill="#bfcdea"
            transform="rotate(-20 730 390)"
          />
        </motion.g>

        {/* Phone with animation */}
        <motion.g
          id="phone"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <rect
            x="280"
            y="100"
            width="240"
            height="440"
            rx="30"
            fill="#3b5998"
          />
          <rect
            x="295"
            y="130"
            width="210"
            height="380"
            rx="5"
            fill="#f5f7fa"
          />
          <rect x="340" y="115" width="120" height="8" rx="4" fill="#2a4278" />
        </motion.g>

        {/* Animated message bubbles */}
        <motion.g
          id="phone-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, staggerChildren: 0.1 }}
        >
          <motion.g initial={{ y: 20 }} animate={{ y: 0 }}>
            <rect
              x="315"
              y="180"
              width="170"
              height="60"
              rx="10"
              fill="#ebedf0"
            />
            <circle cx="330" cy="195" r="15" fill="#d0d6e0" />
            <rect
              x="355"
              y="185"
              width="120"
              height="8"
              rx="4"
              fill="#d0d6e0"
            />
            <rect
              x="355"
              y="200"
              width="100"
              height="8"
              rx="4"
              fill="#d0d6e0"
            />
            <rect x="355" y="215" width="80" height="8" rx="4" fill="#d0d6e0" />
          </motion.g>

          <motion.g initial={{ y: 20 }} animate={{ y: 0 }}>
            <rect
              x="315"
              y="260"
              width="170"
              height="60"
              rx="10"
              fill="#ffcc4d"
            />
            <circle cx="330" cy="275" r="15" fill="#f8a100" />
            <rect
              x="355"
              y="265"
              width="120"
              height="8"
              rx="4"
              fill="#f39c12"
            />
            <rect
              x="355"
              y="280"
              width="100"
              height="8"
              rx="4"
              fill="#f39c12"
            />
            <rect x="355" y="295" width="80" height="8" rx="4" fill="#f39c12" />
          </motion.g>

          <motion.g initial={{ y: 20 }} animate={{ y: 0 }}>
            <rect
              x="315"
              y="340"
              width="170"
              height="60"
              rx="10"
              fill="#ebedf0"
            />
            <circle cx="330" cy="355" r="15" fill="#d0d6e0" />
            <rect
              x="355"
              y="345"
              width="120"
              height="8"
              rx="4"
              fill="#d0d6e0"
            />
            <rect
              x="355"
              y="360"
              width="100"
              height="8"
              rx="4"
              fill="#d0d6e0"
            />
            <rect x="355" y="375" width="80" height="8" rx="4" fill="#d0d6e0" />
          </motion.g>

          <motion.g initial={{ y: 20 }} animate={{ y: 0 }}>
            <rect
              x="315"
              y="420"
              width="170"
              height="60"
              rx="10"
              fill="#ebedf0"
            />
            <circle cx="330" cy="435" r="15" fill="#d0d6e0" />
            <rect
              x="355"
              y="425"
              width="120"
              height="8"
              rx="4"
              fill="#d0d6e0"
            />
            <rect
              x="355"
              y="440"
              width="100"
              height="8"
              rx="4"
              fill="#d0d6e0"
            />
            <rect x="355" y="455" width="80" height="8" rx="4" fill="#d0d6e0" />
          </motion.g>
        </motion.g>

        {/* Person with animation */}
        <motion.g
          id="person"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <rect
            x="200"
            y="350"
            width="70"
            height="120"
            rx="20"
            fill="#e4eaf6"
          />
          <circle cx="230" cy="330" r="30" fill="#2c62c8" />
          <path
            d="M210,325 Q230,345 250,325"
            fill="none"
            stroke="#193775"
            strokeWidth="2"
          />
          <rect
            x="270"
            y="370"
            width="80"
            height="20"
            rx="10"
            fill="#4a7afc"
            transform="rotate(20 270 370)"
          />
          <circle cx="350" cy="390" r="10" fill="#2c62c8" />
          <rect
            x="160"
            y="380"
            width="60"
            height="20"
            rx="10"
            fill="#4a7afc"
            transform="rotate(-20 160 380)"
          />
          <rect x="210" y="470" width="20" height="80" rx="10" fill="#2c385e" />
          <rect x="240" y="470" width="20" height="80" rx="10" fill="#2c385e" />
          <ellipse cx="210" cy="550" rx="20" ry="10" fill="#1e2945" />
          <ellipse cx="250" cy="550" rx="20" ry="10" fill="#1e2945" />
          <circle cx="350" cy="285" r="8" fill="#2c62c8" />
        </motion.g>

        {/* Papers with animation */}
        <motion.g
          id="papers"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <rect
            x="580"
            y="500"
            width="140"
            height="80"
            rx="5"
            fill="#ffffff"
            transform="rotate(-5 580 500)"
          />
          <rect
            x="590"
            y="510"
            width="100"
            height="8"
            rx="4"
            fill="#d0d6e0"
            transform="rotate(-5 590 510)"
          />
          <rect
            x="590"
            y="525"
            width="120"
            height="8"
            rx="4"
            fill="#d0d6e0"
            transform="rotate(-5 590 525)"
          />
          <rect
            x="590"
            y="540"
            width="80"
            height="8"
            rx="4"
            fill="#d0d6e0"
            transform="rotate(-5 590 540)"
          />

          <rect
            x="570"
            y="510"
            width="140"
            height="80"
            rx="5"
            fill="#f0f2f5"
            transform="rotate(-2 570 510)"
          />
          <rect
            x="580"
            y="520"
            width="100"
            height="8"
            rx="4"
            fill="#d0d6e0"
            transform="rotate(-2 580 520)"
          />
          <rect
            x="580"
            y="535"
            width="120"
            height="8"
            rx="4"
            fill="#d0d6e0"
            transform="rotate(-2 580 535)"
          />
          <rect
            x="580"
            y="550"
            width="80"
            height="8"
            rx="4"
            fill="#d0d6e0"
            transform="rotate(-2 580 550)"
          />

          <rect x="565" y="520" width="140" height="80" rx="5" fill="#ffffff" />
          <rect x="575" y="530" width="100" height="8" rx="4" fill="#d0d6e0" />
          <rect x="575" y="545" width="120" height="8" rx="4" fill="#d0d6e0" />
          <rect x="575" y="560" width="80" height="8" rx="4" fill="#d0d6e0" />
        </motion.g>
      </svg>
    </div>
  );
};

export default LoginIllustration;
