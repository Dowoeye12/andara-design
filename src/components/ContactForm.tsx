import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormData } from "@/lib/schemas";
import { sendContactEmail } from "@/lib/emailService";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot check
    if (data.honeypot) {
      return;
    }

    try {
      await sendContactEmail(data);
      toast.success("Thank you. We'll be in touch shortly.");
      reset();
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
      {/* Honeypot field */}
      <input
        type="text"
        {...register("honeypot")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-bac-light">
            Name *
          </Label>
          <Input
            id="name"
            {...register("name")}
            className="bg-bac-dark/50 border-bac-text-tertiary/30 text-bac-light"
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization" className="text-bac-light">
            Organization *
          </Label>
          <Input
            id="organization"
            {...register("organization")}
            className="bg-bac-dark/50 border-bac-text-tertiary/30 text-bac-light"
            aria-invalid={errors.organization ? "true" : "false"}
          />
          {errors.organization && (
            <p className="text-sm text-destructive">{errors.organization.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-bac-light">
            Work Email *
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="bg-bac-dark/50 border-bac-text-tertiary/30 text-bac-light"
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="text-bac-light">
            Role *
          </Label>
          <Select onValueChange={(value) => setValue("role", value as any)}>
            <SelectTrigger
              id="role"
              className="bg-bac-dark/50 border-bac-text-tertiary/30 text-bac-light"
            >
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Operator">Operator</SelectItem>
              <SelectItem value="Lessor">Lessor</SelectItem>
              <SelectItem value="Financier">Financier</SelectItem>
              <SelectItem value="Advisor">Advisor</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && (
            <p className="text-sm text-destructive">{errors.role.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-bac-light">
          Message *
        </Label>
        <Textarea
          id="message"
          {...register("message")}
          rows={4}
          className="bg-bac-dark/50 border-bac-text-tertiary/30 text-bac-light"
          aria-invalid={errors.message ? "true" : "false"}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>


      <Button
        type="submit"
        className="w-full md:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Submit"}
      </Button>
    </form>
  );
};
