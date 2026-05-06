import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EHS Cybersecurity",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        {/* Custom cursor elements */}
        <div id="cursor-dot" />
        <div id="cursor-ring" />

        {children}

        {/* Custom cursor movement script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var dot  = document.getElementById('cursor-dot');
                var ring = document.getElementById('cursor-ring');
                if (!dot || !ring) return;

                var mx = window.innerWidth  / 2;
                var my = window.innerHeight / 2;
                var rx = mx, ry = my;

                document.addEventListener('mousemove', function(e) {
                  mx = e.clientX;
                  my = e.clientY;
                  dot.style.left = mx + 'px';
                  dot.style.top  = my + 'px';
                });

                // Smooth ring follow
                (function loop() {
                  rx += (mx - rx) * 0.12;
                  ry += (my - ry) * 0.12;
                  ring.style.left = rx + 'px';
                  ring.style.top  = ry + 'px';
                  requestAnimationFrame(loop);
                })();

                // Expand on hoverable elements
                var hoverEls = 'a, button, [role="button"], input, textarea, select, label, [data-cursor-expand]';
                document.addEventListener('mouseover', function(e) {
                  if (e.target.closest(hoverEls)) {
                    document.body.classList.add('cursor-expand');
                  }
                });
                document.addEventListener('mouseout', function(e) {
                  if (e.target.closest(hoverEls)) {
                    document.body.classList.remove('cursor-expand');
                  }
                });

                // Hide when leaving window
                document.addEventListener('mouseleave', function() {
                  dot.style.opacity  = '0';
                  ring.style.opacity = '0';
                });
                document.addEventListener('mouseenter', function() {
                  dot.style.opacity  = '';
                  ring.style.opacity = '';
                });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}