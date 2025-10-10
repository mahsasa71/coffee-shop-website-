import { useRef, useState, useContext } from "react";
import Swal from "sweetalert2";
import moment from "moment-jalaali";
import spinSound from "../../assets/sounds/spin-sound.mp3";
import "./Spinner.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { AuthContext } from "../context/AuthContext";

export default function Spinner() {
  const wheelRef = useRef(null);
  const audioRef = useRef(null);
  const { user } = useContext(AuthContext);
  const [spinning, setSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  const prizes = [
    { gift: " دوربین", deg: 0, img: "https://digiarki.com/wp-content/uploads/2023/03/FUJIFILM-INSTAX-Mini-12-Lilac-Purple-5-900x900-1-768x768.jpg" },
    { gift: " هندزفری", deg: 30, img: "https://i.insider.com/61d5c65757bd6c001858a416?width=1200&format=jpeg" },
    { gift: " کیبورد", deg: 60, img: "https://technosun.ir/mag/wp-content/uploads/2021/12/Intro-MK3.jpg" },
    { gift: "گوشی ", deg: 90, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCqUWiVd9en-XbAbcJYCDLARSBWB39mWWi6Q&s" },
    { gift: " تبلت", deg: 120, img: "https://lenovo.ws/wp-content/uploads/2024/11/Lenovo-Tab-P12-7.webp" },
    { gift: " هدفون", deg: 150, img: "https://irgadget.com/wp-content/uploads/2024/06/6-1000x1000_11zon-1.webp" },
    { gift: " بن تخفیف", deg: 180, img: "https://afrafile.com/storage/upload/post/1716377521-Artboard101.webp" },
    { gift: " لپ‌تاپ", deg: 210, img: "https://pskmarket.com/wp-content/uploads/2022/05/laptop-Asus-X543M-2.webp" },
    { gift: " ساعت ", deg: 240, img: "https://sanashop.org/wp-content/uploads/2023/11/Modio-Super-Mini-1.png" },
    { gift: "اسپیکر", deg: 270, img: "https://icbest.ir/wp-content/uploads/2023/04/90639103fa7d1a0502cf8159b1450cf1-min.jpg" },
    { gift: " فرنچ پرس", deg: 300, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLER27AfkapnUsdP3ZvWW8Hj4HJCTSgJwM3g&s" },
    { gift: "😅 هیچی!", deg: 330, img: "/assets/images/nothing.png" },
  ];

 
  const saveGiftToDB = async (gift) => {
    if (!user || user.isLoggedIn !== 1) {
      Swal.fire({
        title: "ورود لازم است",
        text: "برای ثبت جایزه باید وارد حساب کاربری شوید.",
        icon: "warning",
        confirmButtonText: "باشه",
      });
      return;
    }

    const timestamp = Date.now();
    const giftData = {
      id: timestamp.toString(),
      userId: user.id || "unknown",
      username: user.lastName || user.name || "کاربر",
      giftName: gift.gift,
      giftImg: gift.img,
      date: moment(timestamp).format("jYYYY/jMM/jDD HH:mm"),
      timestamp,
      isReceived: 0,
    };

    try {
      await fetch(
        `https://coffee-b43b3-default-rtdb.firebaseio.com/gifts.json`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(giftData),
        }
      );
    } catch (err) {
      console.error("Error saving gift:", err);
    }
  };

  const startRotation = () => {
    if (spinning || hasSpun) return;
    setSpinning(true);
    setHasSpun(true);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(spinSound);
    audio.loop = true;
    audio.play();
    audioRef.current = audio;

    const selected = prizes[Math.floor(Math.random() * prizes.length)];
    const randomRounds = Math.floor(Math.random() * 3) + 5;
    const totalRotation = randomRounds * 360 + selected.deg;
    const duration = Math.floor(Math.random() * 4000) + 3000;

    wheelRef.current.style.transition = `transform ${duration / 1000}s ease-out`;
    wheelRef.current.style.transform = `rotate(-${totalRotation}deg)`;

    setTimeout(async () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

   
      await Swal.fire({
        title: "تبریک 🎉",
        text: `شما برنده‌ی ${selected.gift} شدید!`,
        imageUrl: selected.img,
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: selected.gift,
        confirmButtonText: "باشه",
        confirmButtonColor: "#3085d6",
        background: "#fff",
        color: "#333",
      });

    
      await saveGiftToDB(selected);

      setSpinning(false);
    }, duration + 200);
  };

  return (
    <>
      <Header />
      <div className="spinner-wrapper ">
        <div className="wheel-container">
          <div className="arrow"></div>

          <ul ref={wheelRef} className="circle2">
            {prizes.map((p, i) => (
              <li key={i}>
                <div className="text">{p.gift}</div>
              </li>
            ))}
          </ul>

          <button
            className="spin-button"
            onClick={startRotation}
            disabled={hasSpun}
            style={{
              opacity: hasSpun ? 0.6 : 1,
              cursor: hasSpun ? "not-allowed" : "pointer",
            }}
          >
            {hasSpun ? "✅ چرخوندی!" : "Spin"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
