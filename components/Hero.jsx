"use client";
import useScrollProgress from "./useScrollProgress";

const clamp = (v) => Math.min(1, Math.max(0, v));
const ease = (t) => 1 - Math.pow(1 - t, 3);

// Hero: arranca con el dibujo a mano del edificio y, al scrollear,
// el render se "revela" desde el centro: del trazo al hogar.
export default function Hero() {
  const [ref, p] = useScrollProgress();
  const reveal = ease(clamp((p - 0.1) / 0.6)); // 0 → 1
  const titleOut = clamp(p / 0.35);
  const endIn = clamp((p - 0.7) / 0.2);

  return (
    <section id="inicio" className="hero" ref={ref}>
      <div className="hero__sticky">
        <div className="hero__copy" style={{ opacity: 1 - titleOut, transform: `translateY(${-titleOut * 40}px)` }}>
          <p className="eyebrow">Lanús Este · En construcción</p>
          <h1 className="hero__title">
            Del trazo
            <br />
            <em>a tu hogar.</em>
          </h1>
          <p className="hero__lead">
            Departamentos de 2 y 3 ambientes con patio, balcón o cochera. Anticipo y cuotas.
          </p>
        </div>

        <div className="hero__stage" aria-hidden="true">
          <img className="hero__sketch" src="/img/sketch.webp" alt="" style={{ opacity: 1 - reveal * 0.85 }} />
          <img
            className="hero__render"
            src="/img/edificio.webp"
            alt=""
            style={{
              clipPath: `circle(${reveal * 75}% at 50% 55%)`,
              transform: `scale(${1.08 - reveal * 0.08})`,
            }}
          />
        </div>

        <div className="hero__progress" aria-hidden="true">
          <span className={reveal < 0.5 ? "on" : ""}>Plano</span>
          <i><b style={{ transform: `scaleX(${reveal})` }} /></i>
          <span className={reveal >= 0.5 ? "on" : ""}>Hogar</span>
        </div>

        <div className="hero__end" style={{ opacity: endIn, transform: `translateY(${(1 - endIn) * 20}px)` }}>
          <p className="hero__addr">José Bolaños 1256</p>
          <a href="#unidades" className="btn btn--ink">Elegí tu unidad</a>
        </div>

        <div className="hero__scroll" style={{ opacity: 1 - clamp(p / 0.08) }}>
          Scrolleá para construirlo
        </div>
      </div>
    </section>
  );
}
