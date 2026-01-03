import { 
    SheetContent, 
    SheetDescription, 
    SheetHeader, 
    SheetTitle } from '@/components/ui/sheet'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form } from '@/components/ui/form'
import { useState, useEffect } from "react"
import axiosInstance from '@/lib/axios'

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional()
});

export const New = ({item=null, onSuccess, isOpen}) => {
    const [loading, setLoading] = useState(false);
      const form = useForm ({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

   useEffect(() => {
    if (!isOpen) return;
    if (item) {
      form.reset({
        name: item.name || "",
        description: item.description || "",
      });
    } else {
      form.reset({
        name: "",
        description: "",
      });
    }
  }, [item, isOpen]);

  async function onSubmit(values) {
    setLoading(true)
    if(item?.id){
       await axiosInstance.put(`/api/categories/${item.documentId}`, { 
        data: values 
      });

    } else {
       await axiosInstance.post("/api/categories", { data: values });
    }
   

    toast.success("Category created successfully");
    if (onSuccess) onSuccess();
    setLoading(false);
  }

  return (
    <SheetContent>
    <SheetHeader>
      <SheetTitle>{item?.id ? "Edit" : "Add"} category</SheetTitle>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-6">
                <Field>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <Input 
            id="name" 
            placeholder="Category Name "
            
            {...form.register("name")}
        />
        <FieldDescription>This is your public display name.</FieldDescription>
        <FieldError>{form.formState.errors.name?.message}</FieldError>
        </Field>
                <Field>
        <FieldLabel htmlFor="description">Description</FieldLabel>
        <Textarea 
            id="description" 
            placeholder="Category Description"
            
            {...form.register("description")}
        />
        
        <FieldError>{form.formState.errors.description?.message}</FieldError>
        </Field>
                <Button type="submit" disabled={loading}>{loading ? "Saving" : "Save Changes"}</Button>
        </form>
    </Form>
    </SheetHeader>
  </SheetContent>
  )
}
