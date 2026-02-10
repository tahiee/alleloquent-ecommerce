'use client'

import Link from 'next/link'

interface MobileNavProps {
  onClose: () => void
}

export function MobileNav({ onClose }: MobileNavProps) {
  return (
    <nav className="border-t border-border bg-background">
      <div className="container mx-auto flex flex-col gap-2 px-4 py-4">
        <Link
          href="/products"
          onClick={onClose}
          className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          Shop
        </Link>
        <Link
          href="/about"
          onClick={onClose}
          className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          About
        </Link>
        <Link
          href="/contact"
          onClick={onClose}
          className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          Contact
        </Link>
        <Link
          href="/returns"
          onClick={onClose}
          className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          Returns & Refunds
        </Link>
        <Link
          href="/privacy"
          onClick={onClose}
          className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          Privacy Policy
        </Link>
      </div>
    </nav>
  )
}
