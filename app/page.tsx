const fleet = [
  {
    tier: "Exotic",
    name: "Lamborghini Huracán",
    desc: "5.2L V10, 631 hp. Arrive like the moment was made for you.",
    price: "$1,295",
  },
  {
    tier: "Luxury",
    name: "Mercedes-Benz S-Class",
    desc: "First-class comfort, effortless presence. The executive standard.",
    price: "$549",
  },
  {
    tier: "Performance",
    name: "Porsche 911 Carrera",
    desc: "The icon. Precision engineering for the driver who knows.",
    price: "$795",
  },
  {
    tier: "SUV",
    name: "Range Rover Autobiography",
    desc: "Commanding luxury for any road, any occasion, any weather.",
    price: "$629",
  },
];

export default function Home() {
  return (
    <>
      <header className="container">
        <nav className="nav">
          <div className="brand">
            Prestige <span>Auto Rentals</span>
          </div>
          <a className="nav-cta" href="#reserve">
            Reserve Now
          </a>
        </nav>
      </header>

      <main>
        <section className="container hero">
          <span className="eyebrow">Luxury · Exotic · Performance</span>
          <h1>
            Drive the <em>extraordinary</em>.
          </h1>
          <p>
            An exclusive fleet of the world&apos;s finest automobiles, delivered
            to your door with concierge-level service. Your next arrival deserves
            an entrance.
          </p>
          <div className="actions">
            <a className="btn btn-primary" href="#fleet">
              Explore the Fleet
            </a>
            <a className="btn btn-ghost" href="#reserve">
              Talk to Concierge
            </a>
          </div>
        </section>

        <section id="fleet" className="container section">
          <h2>The Fleet</h2>
          <p className="sub">Hand-selected. Impeccably maintained. Always ready.</p>
          <div className="grid">
            {fleet.map((car) => (
              <article className="card" key={car.name}>
                <div className="tier">{car.tier}</div>
                <h3>{car.name}</h3>
                <p>{car.desc}</p>
                <div className="price">
                  {car.price} <span>/ day</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="reserve" className="container section">
          <h2>Reserve Your Drive</h2>
          <p className="sub">
            Call <strong>+1 (000) 000-0000</strong> or email{" "}
            <a href="mailto:concierge@prestigeautorentals.com" style={{ color: "var(--accent)" }}>
              concierge@prestigeautorentals.com
            </a>
            . Delivery available across the metro area.
          </p>
        </section>
      </main>

      <footer className="container footer">
        <span>© {new Date().getFullYear()} Prestige Auto Rentals. All rights reserved.</span>
        <span>Insured · 21+ · Valid license required</span>
      </footer>
    </>
  );
}
