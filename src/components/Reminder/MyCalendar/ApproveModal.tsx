import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface CommentDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  handleApprove: (schId: string) => void
  handleDeny: () => void
}

export default function ApproveModal({
  open,
  setOpen,
  handleApprove,
}: CommentDialogProps) {
  const [comment, setComment] = useState("")

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Schedule</DialogTitle>
        </DialogHeader>
        <Textarea
          placeholder="Enter your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[100px]"
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            className="bg-green-400 text-white"
            onClick={() => handleApprove(comment)}
          >
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
