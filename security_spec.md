# Security Specification for Krish Portfolio

## Data Invariants
1. A project must have a category (Web Design or Graphic Design).
2. Only the user with email `Jainkrish51952@gmail.com` can be an admin.
3. Users can only read their own profile data (private stuff if any) but anyone can read public profiles (though for this app, users are mostly for interaction).
4. Only admin can create/update/delete projects.
5. Anyone can send a message, but only admin can read them.
6. Notifications are one-way: system to admin.

## The Dirty Dozen Payloads
1. **Unauthorized Project Creation**: User trying to create a project without being admin.
2. **Project ID Poisoning**: Trying to create a project with a 2KB string as ID.
3. **Ghost Field Injection**: Adding `isVerified: true` to a project metadata.
4. **Metadata Spoofing**: Trying to set `authorId` of a message to someone else's UID.
5. **Admin Escalation**: A normal user trying to update their own role to 'admin'.
6. **Notification Scraping**: User trying to list all notifications.
7. **Message Interception**: User trying to read messages sent by others.
8. **Impersonation**: Sending a message with a spoofed email in the payload.
9. **Resource Exhaustion**: Sending a message with a 1MB string in the content.
10. **Timestamp Spiking**: Setting a future date for `createdAt`.
11. **State Shortcut**: Updating a notification to `read: true` without being admin.
12. **Malicious Link Injection**: Injecting script tags into the `liveUrl` field (basic regex check).

## The Test Runner
A `firestore.rules.test.ts` will be implemented using the Firebase local emulator suite if available, but for now we will verify logic via the Rules drafting process.
