"use server"

import { auth } from "@clerk/nextjs/server"
import { DemandLevel, MarketOutlook } from "@prisma/client";

export async function updateUser(data) {
    const {userId} = await auth();
    if(!userId){
        throw new Error("Unauthorized access");
    }

    const user = await db.user.findUnique({
        where:{
            clerkUserId : userId,
        }
    })
    if(!user){
        throw new Error("User not found");
    }

    try {
        const result = await db.$transaction(
            async (tx) =>{
                let industryInsight = await tx.industryInsight.findUnique({
                    where:{
                        industry : data.industry,
                    }
                })
                
                if(!industryInsight){
                    industryInsight = await tx.industryInsight.create({
                        data:{
                            industry: data.industry,
                            salaryRanges: [],
                            growthRate: 0,
                            DemandLevel: "Medium",
                            topSkills: [],
                            MarketOutlook: "Neutral",
                            keyTrends: [],
                            recommendedSkills: [],
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 *60* 1000)
                        }
                    })
                }

                const updatedUser = await tx.user.update({
                    where:{
                        id: user.id,
                    },
                    data:{
                        industry: data.industry,
                        experience : data.experience,
                        bio : data.bio,
                        skills : data.skills,
                    }
                })

                return {updateUser, industryInsight}
            }, {
                timeout: 10000,
            }
        )
        return result.user;
    } catch (error) {
        console.log("Error updating user and industries: " + error.message)
        throw new Error("Failed to update user")
    }
}

export async function getUserOnboardingStatus(){
    const {userId} = await auth();
    if(!userId){
        throw new Error("Unauthorized access");
    }

    const user = await db.user.findUnique({
        where:{
            clerkUserId : userId,
        }
    })
    if(!user){
        throw new Error("User not found");
}   
        try {
            const user = await db.user.findUnique({
                where:{
                    clerkUserId : userId,
                },
                select :{
                    industry: true,
                }
            })
            return {
                isOnboarded: !!user?.industry
            }
        } catch (error) {
            console.log("Error checking onboarding status: ", error.message)
        }
}

