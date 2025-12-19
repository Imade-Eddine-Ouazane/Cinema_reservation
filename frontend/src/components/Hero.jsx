function Hero() {
  return (
    <section className="hero py-16">
      <div className="container hero-content grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="badge mb-4">Premium Cinema Experience</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Book movies in seconds with a sleek, modern interface.
          </h1>
          <p className="text-lg text-dark-200 mb-6 max-w-xl">
            Browse films, reserve seats, and complete payments through our Spring Boot microservices stack.
          </p>
          <div className="flex gap-3">
            <a className="btn-primary" href="#movies">Browse Movies</a>
            <a className="btn-primary" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)' }} href="/reservations">
              View Reservations
            </a>
          </div>
        </div>
        <div className="card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-dark-200 text-sm mb-4">Live services</p>
          <ul className="space-y-3">
            {[{ name: 'API Gateway', port: 8080 }, { name: 'Film Service', port: 8181 }, { name: 'Reservation Service', port: 8182 }, { name: 'Payment Service', port: 8183 }].map((svc) => (
              <li key={svc.port} className="flex items-center justify-between bg-dark-900/60 px-4 py-3 rounded-lg border border-white/5">
                <span className="font-semibold text-white">{svc.name}</span>
                <span className="text-dark-200 text-sm">http://localhost:{svc.port}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Hero
