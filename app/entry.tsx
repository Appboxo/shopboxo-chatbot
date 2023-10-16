import {
  SparklesIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function EntryPointCollapsed({ full = true }: { full?: boolean }) {
  return (
    <div
      className={cn(
        `bg-opacity/80 flex h-12 flex-row content-center items-center justify-around rounded-3xl bg-black`,
        full ? 'w-48' : 'w-12',
      )}
    >
      <SparklesIcon className="h-6 w-6 text-white" />
      {full && (
        <>
          <div className="text-center text-sm font-medium leading-tight text-white">
            Ask Bolt
          </div>
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </>
      )}
    </div>
  )
}

export function EntryPointExpanded() {
  return (
    <div className="bg-opacity/80 inline-flex h-12 w-12 items-center justify-center  rounded-3xl bg-black">
      <XMarkIcon className="h-5 w-5 text-white " />
    </div>
  )
}

export function EntryPoint() {
  const [expand, setExpand] = useState(false)
  return (
    <div
      className="fixed bottom-4 right-4 z-50 cursor-pointer"
      onClick={() => {
        setExpand(!expand)
      }}
    >
      {expand ? <EntryPointExpanded /> : <EntryPointCollapsed />}
    </div>
  )
}
