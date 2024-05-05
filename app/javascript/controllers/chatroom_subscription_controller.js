import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"

// Connects to data-controller="chatroom-subscription"
export default class extends Controller {
  static values = { chatroomId: Number }
  static targets = ["messages"]

  connect() {
    console.log("Connecting to the chatroom");
    this.subscription = createConsumer().subscriptions.create(
      { channel: "ChatroomChannel", id: this.chatroomIdValue },
      { received: (data) => this.#insertMessage(data)}
    )
    // console.log("this.messageTarget:", this.messageTarget);
  }

  disconnect() {
    console.log("disconnected from the chatroom")
    this.subscription.unsubscribe()
  }

  resetForm(event) {
    event.target.reset()
  }

  #insertMessage(data) {
    this.messagesTarget.insertAdjacentHTML("beforeend", data)
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)
  }
}
