import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Checkbox } from "../../components/ui/Checkbox";
import { TextArea } from "../../components/ui/TextArea";
import { Button } from "../../components/ui/Button";
import { UserCharacterizationForm } from "../../types";
import { motion } from "framer-motion";

const GENDER_OPTIONS = [
  { value: "", label: "Select gender" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

const EDUCATION_OPTIONS = [
  { value: "", label: "Select education level" },
  { value: "high-school", label: "High School" },
  { value: "associate", label: "Associate Degree" },
  { value: "bachelor", label: "Bachelor's Degree" },
  { value: "master", label: "Master's Degree" },
  { value: "doctorate", label: "Doctorate" },
  { value: "other", label: "Other" },
];

const INTEREST_OPTIONS = [
  { id: "technology", label: "Technology" },
  { id: "science", label: "Science" },
  { id: "art", label: "Art & Design" },
  { id: "sports", label: "Sports & Fitness" },
  { id: "music", label: "Music" },
  { id: "travel", label: "Travel" },
  { id: "cooking", label: "Cooking" },
  { id: "reading", label: "Reading" },
];

export const CharacterizationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UserCharacterizationForm>({
    defaultValues: {
      fullName: "",
      age: 0,
      gender: "",
      occupation: "",
      education: "",
      interests: [],
      favoriteColor: "#3B82F6", // Default to blue
      bio: "",
    },
  });

  const onSubmit = async (data: UserCharacterizationForm) => {
    // Simulate API call
    console.log("Form data submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Form submitted successfully!");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>User Characterization Form</CardTitle>
        <CardDescription>
          Help us understand you better by filling out this profile information
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              {...register("fullName", {
                required: "Full name is required",
              })}
              error={errors.fullName?.message}
            />

            <Input
              label="Age"
              type="number"
              {...register("age", {
                required: "Age is required",
                min: { value: 18, message: "You must be at least 18 years old" },
                max: { value: 120, message: "Please enter a valid age" },
              })}
              error={errors.age?.message}
            />

            <Select
              label="Gender"
              options={GENDER_OPTIONS}
              {...register("gender", {
                required: "Please select your gender",
              })}
              error={errors.gender?.message}
            />

            <Input
              label="Occupation"
              {...register("occupation", {
                required: "Occupation is required",
              })}
              error={errors.occupation?.message}
            />

            <Select
              label="Education Level"
              options={EDUCATION_OPTIONS}
              {...register("education", {
                required: "Please select your education level",
              })}
              error={errors.education?.message}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Favorite Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  className="h-10 w-10 rounded border border-slate-300 dark:border-slate-600"
                  {...register("favoriteColor")}
                />
                <Input
                  {...register("favoriteColor")}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Interests (select all that apply)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {INTEREST_OPTIONS.map((interest) => (
                <div key={interest.id}>
                  <Controller
                    name="interests"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id={`interest-${interest.id}`}
                        label={interest.label}
                        checked={field.value?.includes(interest.id)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const currentInterests = field.value || [];
                          if (checked) {
                            field.onChange([...currentInterests, interest.id]);
                          } else {
                            field.onChange(
                              currentInterests.filter(
                                (i) => i !== interest.id
                              )
                            );
                          }
                        }}
                      />
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          <TextArea
            label="Bio"
            rows={4}
            placeholder="Tell us a bit about yourself..."
            {...register("bio", {
              required: "Please enter a short bio",
              maxLength: {
                value: 500,
                message: "Bio cannot exceed 500 characters",
              },
            })}
            error={errors.bio?.message}
          />

          <div className="flex justify-end">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" isLoading={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Save Profile"}
              </Button>
            </motion.div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};